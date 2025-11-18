import { simState } from "./globals.svelte";
import type { p5 } from "p5-svelte";

class effectors {
    light: boolean;
    temp: boolean;
    humidity: boolean;
    soilm: boolean;

    // Properties for the 3D lamp's position and dimensions
    lampPos: any;
    lampWidth: number;
    lampHeight: number;
    lampDepth: number;

    constructor(p5: p5) {
        this.light = false;
        this.temp = false;
        this.humidity = false;
        this.soilm = false;

        // --- Initialize 3D Lamp Properties ---
        this.lampWidth = 300;
        this.lampHeight = 50;
        this.lampDepth = 300;

        // Position the lamp above the farmland
        this.lampPos = p5.createVector(0, -p5.height / 3 - 50, 0);
    }

    display(p5: p5) {
        // --- Lamp ---
        if (this.light) {
            p5.push();
            p5.translate(this.lampPos.x, this.lampPos.y, this.lampPos.z);

            // Socket
            p5.push();
            p5.fill(120, 120, 120);
            p5.cylinder(18, 32);
            p5.pop();

            // Bulb (glass)
            p5.push();
            p5.translate(0, 32, 0);
            p5.fill(255, 255, 200, 180);
            p5.sphere(32);
            p5.pop();

            // Filament glow
            p5.push();
            p5.translate(0, 32, 0);
            p5.emissiveMaterial(255, 255, 120);
            p5.sphere(12);
            p5.pop();

            // Stylized light rays

            // pulsing and animation of rays
            const t = p5.millis() / 1000;
            const pulse = 1 + 0.1 * Math.sin(t*2);

            //ray detailing
            p5.push();
            p5.translate(0, 64, 0);
            p5.stroke(255, 255, 180, 90);
            p5.strokeWeight(2.5);
            const rayCount = 32;
            const rayLength = 540;
            for (let i = 0; i < rayCount; i++) {
                const angle = (2 * Math.PI * i) / rayCount;
                const x = Math.cos(angle) * 120;
                const z = Math.sin(angle) * 120;
                p5.line(0, 0, 0, x, rayLength, z);
            }
            p5.pop();
            p5.pop();

            p5.push();
                p5.translate(0, 64, 0);
                p5.stroke(255, 255, 180, 90);
                p5.strokeWeight(2.5);
                const rayCountX = 32;
                const rayLengthX = 360;
                for (let i=0; i < rayCountX; i++) {
                    const angle = (2 * Math.PI * i)/rayCountX;
                    const x = (Math.PI * i)/rayCount;
                    const z = Math.sin(angle) * 80;
                    p5.line(0, 0, 0, x, rayLengthX, z);
                }
                p5.pop();
                p5.pop();
            
        }

        // --- Heater ---
        if (this.temp) {
            p5.push();
            const heaterX = p5.width / 2.2;
            const heaterY = p5.height / 5 - 30;
            p5.translate(heaterX, heaterY, 0);

            // Heater body
            p5.noStroke();
            p5.ambientMaterial(180, 60, 40);
            p5.box(40, 60, 40);

            // Heater grill
            p5.push();
            p5.translate(0, 0, 21);
            p5.ambientMaterial(220, 120, 80);
            p5.box(36, 48, 2);
            p5.stroke(120, 60, 40);
            p5.strokeWeight(2);
            for (let i = -14; i <= 14; i += 7) {
                p5.line(i, -20, 2, i, 20, 2);
            }
            p5.pop();

            // Glowing heat effect
            p5.push();
            p5.translate(0, 0, 24);
            p5.noStroke();
            for (let i = 0; i < 3; i++) {
                p5.emissiveMaterial(255, 120 + i * 40, 40);
                p5.sphere(18 + i * 6);
            }
            p5.pop();

            // Heat waves
            p5.push();
            p5.translate(0, -40, 0);
            p5.stroke(255, 180, 80, 120);
            p5.strokeWeight(3);
            for (let w = -12; w <= 12; w += 12) {
                for (let t = 0; t < 20; t++) {
                    let x1 = w + Math.sin(t / 2 + p5.frameCount / 10) * 3;
                    let y1 = -t * 2;
                    let x2 = w + Math.sin((t + 1) / 2 + p5.frameCount / 10) * 3;
                    let y2 = -(t + 1) * 2;
                    p5.line(x1, y1, 0, x2, y2, 0);
                }
            }
            p5.pop();
            p5.pop();
        }

        // --- Dehumidifier ---
        if (this.humidity) {
            p5.push();
            const dehumX = -p5.width / 2.2;
            const dehumY = p5.height / 5 - 30;
            p5.translate(dehumX, dehumY, 0);

            // Main body
            p5.noStroke();
            p5.ambientMaterial(180, 200, 220);
            p5.box(44, 70, 44);

            // Air intake grill
            p5.push();
            p5.translate(0, -20, 22);
            p5.ambientMaterial(140, 180, 200);
            p5.box(38, 18, 4);
            p5.stroke(100, 140, 180);
            p5.strokeWeight(2);
            for (let i = -14; i <= 14; i += 7) {
                p5.line(i, -8, 2, i, 8, 2);
            }
            p5.pop();

            // Water tank
            p5.push();
            p5.translate(0, 28, 0);
            p5.fill(120, 180, 255, 80);
            p5.box(36, 16, 36);
            p5.pop();

            // Air flow effect
            p5.push();
            p5.translate(0, -40, 0);
            p5.stroke(120, 180, 255, 120);
            p5.strokeWeight(3);
            for (let w = -12; w <= 12; w += 12) {
                for (let t = 0; t < 16; t++) {
                    let x1 = w + Math.sin(t / 2 + p5.frameCount / 12) * 3;
                    let y1 = -t * 2;
                    let x2 = w + Math.sin((t + 1) / 2 + p5.frameCount / 12) * 3;
                    let y2 = -(t + 1) * 2;
                    p5.line(x1, y1, 0, x2, y2, 0);
                }
            }
            p5.pop();

            p5.pop();
        }

            // --- Sprinkler (simple geometric + rotating jets) ---
    if (this.soilm) {
        p5.push();
    
        // Position on farmland
        const sprX = 0;
        const sprY = 40;
        const sprZ = 0;
        p5.translate(sprX, sprY, sprZ);
    
        // ==== BASE ====
        p5.push();
        p5.fill(150, 150, 150);
        p5.cylinder(30, 20, 24, 1);   // short base cylinder
        p5.pop();
    
        // ==== VERTICAL PIPE ====
        p5.push();
        p5.translate(0, -30, 0);      // lift upwards
        p5.fill(170, 170, 170);
        p5.cylinder(10, 60, 16, 1);
        p5.pop();
    
        // ==== ROTATING SPRINKLER HEAD ====
        p5.push();
        p5.translate(0, -60, 0);
    
        // rotate head continuously
        const rotationSpeed = 0.04;
        p5.rotateY(p5.frameCount * rotationSpeed);
    
        // head
        p5.fill(180, 180, 180);
        p5.sphere(14);
    
        // sprinkler arms
        const armLength = 40;
        const armWidth  = 6;
    
        for (let a = 0; a < 3; a++) {
            p5.push();
            p5.rotateY((p5.TWO_PI / 3) * a);
            p5.translate(armLength / 2, 0, 0);
            p5.box(armLength, armWidth, armWidth);   // arm bar
            p5.pop();
        }
        p5.pop();
    
        // ==== WATER JETS ====
        p5.push();
        p5.translate(0, -60, 0);  // start from head
    
        const jetCount = 3;        // 3 arms
        const segments = 26;       // length of each stream
        const spreadAngle =  p5.radians(22);  // slight upward tilt
    
        for (let j = 0; j < jetCount; j++) {
    
            // match water jets to arm rotation
            const baseAngle = p5.frameCount * rotationSpeed + (p5.TWO_PI / 3) * j;
    
            for (let s = 0; s < segments; s++) {
                const dist0 = s * 3;
                const dist1 = (s + 1) * 3;
    
                // small jitter to look natural
                const jitter = Math.sin(p5.frameCount * 0.05 + s * 0.3) * 0.6;
    
                const x1 = Math.cos(baseAngle) * dist0 + jitter;
                const z1 = Math.sin(baseAngle) * dist0 + jitter;
                const y1 = Math.sin(spreadAngle) * -dist0;
    
                const x2 = Math.cos(baseAngle) * dist1 + jitter;
                const z2 = Math.sin(baseAngle) * dist1 + jitter;
                const y2 = Math.sin(spreadAngle) * -dist1;
    
                const alpha = p5.map(s, 0, segments - 1, 220, 40);
    
                p5.stroke(80, 170, 255, alpha);
                p5.strokeWeight(2);
                p5.line(x1, y1, z1, x2, y2, z2);
            }
        }
    
        p5.pop();
        p5.pop();
    }

    update(p5) {
        this.light = !!simState.effectors[0];
        this.temp = !!simState.effectors[1];
        this.humidity = !!simState.effectors[3];
        this.soilm = !!simState.effectors[2];
    }
}
}
export { effectors };
