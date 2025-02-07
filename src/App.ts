import { Lightning, Utils, Colors } from "@lightningjs/sdk";
import { Count } from "./components/Count";

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: {
    Logo: object;
    Mystery: object;
    Text: object;
    Box1: {
      Border: object;
    };
    Button: object;
  };
  CounterUI: typeof Count;
}

export class App
  extends Lightning.Component<AppTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  readonly Background = this.getByRef("Background")!;
  readonly Logo = this.Background.getByRef("Logo")!;
  readonly Text = this.Background.getByRef("Text")!;
  readonly Mystery = this.Background.getByRef("Mystery")!;
  readonly Box1 = this.Background.getByRef("Box1")!;
  readonly Border = this.Box1.getByRef("Border")!;
  readonly Button = this.Background.getByRef("Button")!;
  readonly CounterUI = this.getByRef("CounterUI") as Count;

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset("images/background.png"),
        Logo: {
          mountX: 0.5,
          mountY: 1,
          x: 960,
          y: 600,
          w: 100,
          h: 100,
          src: Utils.asset("images/logo.png"),
          scale: 1,
        },
        Mystery: {
          x: 930,
          y: 400,
          w: 150,
          h: 150,
          scale: 0,
          src: Utils.asset("images/mystery.png"),
        },
        Text: {
          mount: 0.5,
          x: 960,
          y: 720,
          scale: 1,

          text: {
            text: "Let's start!",
            fontFace: "Regular",
            fontSize: 64,
            textColor: 0xbbffffff,
          },
        },
        Box1: {
          collision: true,
          x: 200,
          y: 200,
          w: 100,
          h: 100,
          rect: true,
          color: Colors("transparent").get(),

          Border: {
            collision: true,
            x: 2,
            y: 2,
            w: 96,
            h: 96,
            color: 0xffff0000,

            rect: true,
          },
        },
        Button: {
          mountX: 0.5,
          mountY: 0.5,
          w: 50,
          h: 50,
          x: 960,
          y: 200,
          rect: true,
          shader: { type: Lightning.shaders.RoundedRectangle, radius: 10 },
        },
      },
      CounterUI: {
        x: 560,
        y: 240,
        type: Count,
        visible: false,

        signals: {
          onclick: "_onClose",
        },
      },
    };
  }

  static getFonts() {
    return [
      {
        family: "Regular",
        url: Utils.asset("fonts/Roboto-Regular.ttf") as string,
      },
    ];
  }

  override _init() {
    this.stage.transitions.defaultTransitionSettings.duration = 1;

    this._setState("TextFocused");
  }
  $closeui() {
    this.isCounterVisible = false;
    this.CounterUI.visible = false;
    this._setState("TextFocused");
    console.log("Counter UI closed via $onClose event");
  }

  static override _states() {
    return [
      class TextFocused extends this {
        override _handleEnter() {
          this.tag("Background.Text")?.setSmooth("scale", 1.5);
        }
        override _handleLeft() {
          this._setState("Box1Focused");
        }
        override _handleUp() {
          this._setState("ButtonFocused");
        }
      },
      class Box1Focused extends this {
        override $enter() {
          this.tag("Background.Box1")?.setSmooth("color", 0xff0000ff);
        }
        override _handleEnter() {
          this.tag("Background.Box1")?.setSmooth("scale", 1.5);
          this.tag("Background.Box1")?.setSmooth("color", 0xff0000ff);
        }
        override _handleRight() {
          this._setState("TextFocused");
          this.tag("Background.Box1")?.setSmooth("scale", 1);
        }
        override _handleUp() {
          this._setState("logoFocused");
        }
        _handleClick() {
          this.tag("Background.Box1")?.setSmooth("scale", 3.5);
          console.log("handle clicked working ");
        }
      },
      class logoFocused extends this {
        override _handleEnter() {
          this.tag("Background.Logo")?.setSmooth("scale", 1.5);
        }
        override _handleRight() {
          this._setState("TextFocused");
          this.tag("Background.Box1")?.setSmooth("scale", 2);
        }
      },
      class ButtonFocused extends this {
        override $enter() {
          this.tag("Background.Button")?.setSmooth("color", 0xff00ff00);
        }
        override _handleEnter() {
          this.tag("Background.Button")?.setSmooth("scale", 1.5);
          this.showCounter();
        }
      },
      class CounterVisible extends this {
        override _getFocused() {
          return this.CounterUI;
        }
        override _handleBack() {
          this._setState("TextFocused");
          console.log("Back/Escape pressed");
          this.$closeui();

          return true;
        }
      },
    ];
  }
  private isCounterVisible = false;
  private showCounter() {
    this.isCounterVisible = true;

    this.CounterUI.visible = this.isCounterVisible;
    this._setState("CounterVisible");
  }
}
