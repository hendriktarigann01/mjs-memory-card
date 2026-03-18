import { Volume2, VolumeX, Timer, Lightbulb } from "lucide-react";

interface GameSettingsProps {
  soundEnabled: boolean;
  hintEnabled: boolean;
  timerEnabled: boolean;
  onSoundToggle: () => void;
  onHintToggle: () => void;
  onTimerToggle: () => void;
}

export function GameSettings({
  soundEnabled,
  hintEnabled,
  timerEnabled,
  onSoundToggle,
  onHintToggle,
  onTimerToggle,
}: GameSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center gap-10">
            <div className="flex gap-3">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-blue-300" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="font-semibold text-white/90">Sound Effects</p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={onSoundToggle}
              className="sr-only peer"
            />
            <div className="relative w-12 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </div>
        </label>

        <label className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <Lightbulb
              className={`w-5 h-5 ${hintEnabled ? "text-yellow-300" : "text-gray-400"}`}
            />
            <div>
              <p className="font-semibold text-white/90">Hints</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={hintEnabled}
            onChange={onHintToggle}
            className="sr-only peer"
          />
          <div className="relative w-12 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
        </label>

        <label className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <Timer
              className={`w-5 h-5 ${timerEnabled ? "text-pink-300" : "text-gray-400"}`}
            />
            <div>
              <p className="font-semibold text-white/90">Timer</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={timerEnabled}
            onChange={onTimerToggle}
            className="sr-only peer"
          />
          <div className="relative w-12 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
        </label>
      </div>

      <div className="pt-4 border-t border-white/10">
        <p className="text-xs text-white/50 text-center">
          Settings are saved automatically
        </p>
      </div>
    </div>
  );
}
