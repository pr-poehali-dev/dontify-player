const CLIENT_ID = "a0f56d3b05c24f5abf205249e683bafc";
const CLIENT_SECRET = "24ee51ef66ce4f2484fda3848f9c270f";
const REDIRECT_URI = window.location.origin;

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  duration_ms: number;
  preview_url: string | null;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: {
    total: number;
  };
}

class SpotifyAPI {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.accessToken = localStorage.getItem("spotify_access_token");
    this.refreshToken = localStorage.getItem("spotify_refresh_token");
  }

  // Генерация случайной строки для PKCE
  private generateRandomString(length: number): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // SHA256 хеширование для PKCE
  private async sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  }

  // Base64 URL encode для PKCE
  private base64encode(input: ArrayBuffer): string {
    const bytes = new Uint8Array(input);
    const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
      "",
    );
    return btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  // Авторизация через Spotify
  async authorize(): Promise<void> {
    const codeVerifier = this.generateRandomString(64);
    const hashed = await this.sha256(codeVerifier);
    const codeChallenge = this.base64encode(hashed);

    localStorage.setItem("code_verifier", codeVerifier);

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "code",
      redirect_uri: REDIRECT_URI,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      scope:
        "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read user-read-playback-state user-modify-playback-state streaming",
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  // Обмен кода на токен
  async exchangeToken(code: string): Promise<boolean> {
    const codeVerifier = localStorage.getItem("code_verifier");
    if (!codeVerifier) return false;

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier,
        }).toString(),
      });

      const data = await response.json();

      if (data.access_token) {
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;

        localStorage.setItem("spotify_access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("spotify_refresh_token", data.refresh_token);
        }
        localStorage.removeItem("code_verifier");

        return true;
      }
    } catch (error) {
      console.error("Token exchange failed:", error);
    }

    return false;
  }

  // Обновление токена
  async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false;

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: this.refreshToken,
        }).toString(),
      });

      const data = await response.json();

      if (data.access_token) {
        this.accessToken = data.access_token;
        localStorage.setItem("spotify_access_token", data.access_token);
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }

    return false;
  }

  // Проверка авторизации
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  // Выход
  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");
  }

  // API запрос с обработкой ошибок
  private async apiRequest(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<any> {
    if (!this.accessToken) {
      throw new Error("No access token available");
    }

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (response.status === 401) {
      // Токен истёк, пробуем обновить
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        // Повторяем запрос с новым токеном
        return this.apiRequest(endpoint, options);
      } else {
        throw new Error("Authentication failed");
      }
    }

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    return response.json();
  }

  // Получение информации о пользователе
  async getCurrentUser(): Promise<any> {
    return this.apiRequest("/me");
  }

  // Получение плейлистов пользователя
  async getUserPlaylists(limit: number = 20): Promise<SpotifyPlaylist[]> {
    const data = await this.apiRequest(`/me/playlists?limit=${limit}`);
    return data.items;
  }

  // Получение треков плейлиста
  async getPlaylistTracks(
    playlistId: string,
    limit: number = 50,
  ): Promise<SpotifyTrack[]> {
    const data = await this.apiRequest(
      `/playlists/${playlistId}/tracks?limit=${limit}`,
    );
    return data.items
      .map((item: any) => item.track)
      .filter((track: any) => track && track.id);
  }

  // Получение сохранённых треков
  async getSavedTracks(limit: number = 50): Promise<SpotifyTrack[]> {
    const data = await this.apiRequest(`/me/tracks?limit=${limit}`);
    return data.items.map((item: any) => item.track);
  }

  // Поиск треков
  async searchTracks(
    query: string,
    limit: number = 20,
  ): Promise<SpotifyTrack[]> {
    const params = new URLSearchParams({
      q: query,
      type: "track",
      limit: limit.toString(),
    });

    const data = await this.apiRequest(`/search?${params.toString()}`);
    return data.tracks.items;
  }

  // Получение топ треков
  async getTopTracks(
    timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
  ): Promise<SpotifyTrack[]> {
    const data = await this.apiRequest(
      `/me/top/tracks?time_range=${timeRange}&limit=20`,
    );
    return data.items;
  }

  // Получение рекомендаций
  async getRecommendations(
    seedTracks?: string[],
    seedArtists?: string[],
    seedGenres?: string[],
  ): Promise<SpotifyTrack[]> {
    const params = new URLSearchParams();

    if (seedTracks?.length)
      params.append("seed_tracks", seedTracks.slice(0, 5).join(","));
    if (seedArtists?.length)
      params.append("seed_artists", seedArtists.slice(0, 5).join(","));
    if (seedGenres?.length)
      params.append("seed_genres", seedGenres.slice(0, 5).join(","));

    params.append("limit", "20");

    const data = await this.apiRequest(`/recommendations?${params.toString()}`);
    return data.tracks;
  }

  // Форматирование длительности трека
  formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

export const spotifyAPI = new SpotifyAPI();
