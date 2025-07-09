import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState([30]);
  const [activeTab, setActiveTab] = useState("home");

  const tracks = [
    {
      id: 1,
      title: "Cosmic Dreams",
      artist: "Space Odyssey",
      duration: "3:45",
      cover: "/img/faaa697c-b6b1-4f1f-84de-52b8e62ae8ce.jpg",
    },
    {
      id: 2,
      title: "Neon Nights",
      artist: "Cyber Sounds",
      duration: "4:12",
      cover: "/img/faaa697c-b6b1-4f1f-84de-52b8e62ae8ce.jpg",
    },
    {
      id: 3,
      title: "Digital Waves",
      artist: "Tech Harmony",
      duration: "3:28",
      cover: "/img/faaa697c-b6b1-4f1f-84de-52b8e62ae8ce.jpg",
    },
    {
      id: 4,
      title: "Retro Future",
      artist: "Vinyl Dreams",
      duration: "5:03",
      cover: "/img/faaa697c-b6b1-4f1f-84de-52b8e62ae8ce.jpg",
    },
  ];

  const playlists = [
    { id: 1, name: "Избранное", count: 23, icon: "Heart" },
    { id: 2, name: "Рабочий день", count: 45, icon: "Coffee" },
    { id: 3, name: "Тренировка", count: 32, icon: "Zap" },
    { id: 4, name: "Релакс", count: 18, icon: "Moon" },
  ];

  const navigation = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "search", label: "Поиск", icon: "Search" },
    { id: "library", label: "Библиотека", icon: "Library" },
    { id: "playlists", label: "Плейлисты", icon: "ListMusic" },
    { id: "settings", label: "Настройки", icon: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent" />

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-black/20 backdrop-blur-sm border-r border-white/10 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎵 Music Player
            </h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-purple-600/30 text-white border border-purple-500/50"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Playlists */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Плейлисты
            </h3>
            <div className="space-y-2">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Icon name={playlist.icon} size={16} />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{playlist.name}</div>
                    <div className="text-xs text-gray-500">
                      {playlist.count} треков
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between p-6 bg-black/10 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  placeholder="Поиск музыки, исполнителей..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
              >
                <Icon name="Bell" size={20} />
              </Button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 p-6 overflow-y-auto">
            {activeTab === "home" && (
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600/30 to-pink-600/30 p-8 border border-purple-500/30">
                  <div className="absolute inset-0 bg-[url('/img/faaa697c-b6b1-4f1f-84de-52b8e62ae8ce.jpg')] bg-cover bg-center opacity-20" />
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">
                      Добро пожаловать в будущее музыки
                    </h2>
                    <p className="text-lg text-gray-300 mb-6">
                      Откройте для себя новые звуки в нашей космической
                      библиотеке
                    </p>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                      <Icon name="Play" size={20} className="mr-2" />
                      Начать прослушивание
                    </Button>
                  </div>
                </div>

                {/* Recent Tracks */}
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Недавно проигранные
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {tracks.map((track, index) => (
                      <Card
                        key={track.id}
                        className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="p-4">
                          <div className="relative mb-4">
                            <img
                              src={track.cover}
                              alt={track.title}
                              className="w-full aspect-square object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                              <Button
                                size="sm"
                                className="bg-purple-600 hover:bg-purple-700 text-white border-0 rounded-full w-12 h-12"
                                onClick={() => {
                                  setCurrentTrack(index);
                                  setIsPlaying(!isPlaying);
                                }}
                              >
                                <Icon
                                  name={
                                    isPlaying && currentTrack === index
                                      ? "Pause"
                                      : "Play"
                                  }
                                  size={20}
                                />
                              </Button>
                            </div>
                          </div>
                          <h4 className="font-semibold text-white truncate">
                            {track.title}
                          </h4>
                          <p className="text-gray-400 text-sm truncate">
                            {track.artist}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {track.duration}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Рекомендации для вас
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30 p-6">
                      <Icon
                        name="TrendingUp"
                        size={24}
                        className="text-purple-400 mb-3"
                      />
                      <h4 className="font-semibold text-white mb-2">
                        Популярные треки
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Самые популярные композиции недели
                      </p>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30 p-6">
                      <Icon
                        name="Radio"
                        size={24}
                        className="text-blue-400 mb-3"
                      />
                      <h4 className="font-semibold text-white mb-2">
                        Радиостанции
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Персональные радиостанции под ваш вкус
                      </p>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30 p-6">
                      <Icon
                        name="Headphones"
                        size={24}
                        className="text-green-400 mb-3"
                      />
                      <h4 className="font-semibold text-white mb-2">
                        Подкасты
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Новые выпуски ваших любимых подкастов
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "library" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Моя библиотека</h2>
                <div className="space-y-2">
                  {tracks.map((track, index) => (
                    <div
                      key={track.id}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group"
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 rounded-full bg-purple-600/20 hover:bg-purple-600 text-purple-400 hover:text-white transition-all duration-200"
                        onClick={() => {
                          setCurrentTrack(index);
                          setIsPlaying(!isPlaying);
                        }}
                      >
                        <Icon
                          name={
                            isPlaying && currentTrack === index
                              ? "Pause"
                              : "Play"
                          }
                          size={14}
                        />
                      </Button>
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-white">
                          {track.title}
                        </h4>
                        <p className="text-gray-400 text-sm">{track.artist}</p>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {track.duration}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon
                          name="Heart"
                          size={16}
                          className="text-gray-400 hover:text-red-400"
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon
                          name="MoreHorizontal"
                          size={16}
                          className="text-gray-400"
                        />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "search" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Поиск</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Поп",
                    "Рок",
                    "Электроника",
                    "Хип-хоп",
                    "Джаз",
                    "Классика",
                    "Indie",
                    "R&B",
                  ].map((genre) => (
                    <Card
                      key={genre}
                      className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-purple-500/30 p-6 text-center hover:scale-105 transition-transform cursor-pointer"
                    >
                      <h3 className="font-bold text-white">{genre}</h3>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Настройки</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/5 border-white/10 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Качество звука
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="quality"
                          className="text-purple-600"
                        />
                        <span className="text-gray-300">Автоматически</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="quality"
                          className="text-purple-600"
                        />
                        <span className="text-gray-300">
                          Высокое (320 kbps)
                        </span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="quality"
                          className="text-purple-600"
                        />
                        <span className="text-gray-300">Lossless</span>
                      </label>
                    </div>
                  </Card>
                  <Card className="bg-white/5 border-white/10 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Интерфейс
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Тёмная тема</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="text-purple-600"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Анимации</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="text-purple-600"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Уведомления</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="text-purple-600"
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-lg border-t border-white/10 p-4">
        <div className="flex items-center space-x-4">
          {/* Track Info */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img
              src={tracks[currentTrack]?.cover}
              alt={tracks[currentTrack]?.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <h4 className="font-medium text-white truncate">
                {tracks[currentTrack]?.title}
              </h4>
              <p className="text-gray-400 text-sm truncate">
                {tracks[currentTrack]?.artist}
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <Icon
                name="Heart"
                size={16}
                className="text-gray-400 hover:text-red-400"
              />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <Icon name="Shuffle" size={20} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <Icon name="SkipBack" size={20} />
              </Button>
              <Button
                className="bg-white text-black hover:bg-gray-200 rounded-full w-10 h-10"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <Icon name="SkipForward" size={20} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <Icon name="Repeat" size={20} />
              </Button>
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <span className="text-xs text-gray-400">1:30</span>
              <Slider
                value={progress}
                onValueChange={setProgress}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-gray-400">
                {tracks[currentTrack]?.duration}
              </span>
            </div>
          </div>

          {/* Volume & Additional Controls */}
          <div className="flex items-center space-x-2 min-w-0 flex-1 justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Icon name="Mic2" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Icon name="ListMusic" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Icon name="Monitor" size={20} />
            </Button>
            <div className="flex items-center space-x-2">
              <Icon name="Volume2" size={20} className="text-gray-400" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
