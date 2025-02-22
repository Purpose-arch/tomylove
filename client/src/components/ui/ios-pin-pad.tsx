import { useState } from "react";
import { motion } from "framer-motion";
import { IOSButton } from "./ios-button";

interface IOSPinPadProps {
  onSubmit: (pin: string) => void;
}

export function IOSPinPad({ onSubmit }: IOSPinPadProps) {
  const [pin, setPin] = useState("");

  const handleNumberPress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        onSubmit(newPin);
        setPin("");
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-8">
      <div className="flex justify-center space-x-4">
        {[0,1,2,3].map(i => (
          <motion.div
            key={i}
            className={`w-4 h-4 rounded-full ${
              pin.length > i ? "bg-pink-500" : "bg-pink-200"
            }`}
            animate={{
              scale: pin.length > i ? [1, 1.2, 1] : 1
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[1,2,3,4,5,6,7,8,9].map(num => (
          <IOSButton
            key={num}
            variant="ghost"
            className="h-16 text-2xl text-pink-600 hover:bg-pink-50"
            onClick={() => handleNumberPress(num.toString())}
          >
            {num}
          </IOSButton>
        ))}
        <IOSButton
          variant="ghost"
          className="h-16 text-2xl text-pink-600 hover:bg-pink-50"
          onClick={() => handleDelete()}
        >
          ⌫
        </IOSButton>
        <IOSButton
          variant="ghost"
          className="h-16 text-2xl text-pink-600 hover:bg-pink-50"
          onClick={() => handleNumberPress("0")}
        >
          0
        </IOSButton>
      </div>
    </div>
  );
}