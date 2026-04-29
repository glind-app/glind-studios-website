import { useEffect, useRef } from "react";
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MODEL_URL = "/Fox.glb";

useGLTF.preload(MODEL_URL);

export default function Fox() {
  const group = useRef();
  const floatRef = useRef();
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const first = actions[Object.keys(actions)[0]];
    first?.reset().fadeIn(0.4).play();
    return () => first?.fadeOut(0.4);
  }, [actions]);

  useGSAP(() => {
    const el = floatRef.current;
    if (!el) return;

    // Gentle float up and down
    gsap.to(el.position, {
      y: 0.06,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Very subtle side sway
    gsap.to(el.rotation, {
      z: 0.018,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <group ref={floatRef}>
      <Center scale={1.1}>
        <primitive ref={group} object={scene} rotation={[0, Math.PI + 30, 0]} />
      </Center>
    </group>
  );
}
