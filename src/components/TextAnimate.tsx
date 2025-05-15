import { TextAnimate } from "@/components/MotionText";

export function TextAnimateDemo() {
  return (
    <TextAnimate animation="blurInUp" by="character" once>
      Blur in by character
    </TextAnimate>
  );
}
