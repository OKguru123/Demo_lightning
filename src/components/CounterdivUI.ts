import { Lightning, Colors } from "@lightningjs/sdk";
import Color from "@lightningjs/sdk/src/Colors";
import { Count } from "./Count";

interface CounterDivTemplateSpec extends Lightning.Component.TemplateSpec {
  Incrementbutton: object;
  Descrementbutton: object;
  Outputui: object;
}

export class CounterDiv
  extends Lightning.Component<CounterDivTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<CounterDivTemplateSpec>
{
  public _count = 0;

  static override _template() {
    return {
      rect: true,
      color: Colors("red").get(),
      // Define the sub‑components for the counter UI:
      h: 50,
      w: 250,
      // collision: true,
      gap: 30,

      Incrementbutton: {
        collision: true,
        x: 20,
        y: 20,
        mount: 0.5,
        scale: 2,

        rect: true,
        Color: Colors("green").get(),

        text: {
          text: "+",
          fontSize: 36,
        },
      },
      Descrementbutton: {
        collision: true,
        x: 200,
        y: 20,
        mount: 0.5,
        scale: 2,
        text: { text: "-", fontSize: 36 },
      },
      Outputui: {
        x: 100,
        y: 20,
        mount: 0.5,
        text: { text: "0", fontSize: 36 },
      },
    };
  }
  private count = 0;
  private UpdateCount() {
    this.count++;
    this.tag("Outputui")?.patch({ text: this.count.toString() });
    console.log("incre focused");
  }

  override _init() {
    this._setState("counderdivUIfocus");
  }
  _handleClick() {
    console.log("cliked working");
  }
  override _handleEnter(e: KeyboardEvent): boolean | void {
    console.log("handle enter clicked");
  }
  static override _states() {
    return [
      class counderdivUIfocus extends this {
        override _handleEnter() {
          console.log("handle enter clicked 2");
        }
        _handleHover() {
          this.tag("Incrementbutton")?.patch({ scale: 2.5 });
          this.tag("Incrementbutton")?.setSmooth("color", 0xff00ff00);
        }
        _handleUnhover() {
          this.tag("Incrementbutton")?.patch({ scale: 2 });
          this.tag("Incrementbutton")?.setSmooth("color", 0xff0000ff);
          this._setState("decrementFocused");
        }

        override _handleClick() {
          // this.tag("Incrementbutton")?.patch({ scale: 2.5 });
          // this.tag("Incrementbutton")?.setSmooth("color", 0xff00ff00);
          this._setState("increFocused");
        }
      },
      class increFocused extends this {
        override _handleClick() {
          this.UpdateCount();
        }
        _handleUnhover() {
          this.tag("Incrementbutton")?.patch({ scale: 2 });
          this.tag("Incrementbutton")?.setSmooth("color", 0xff00ff00);
          this._setState("decrementFocused");
        }
      },
      class decrementFocused extends this {
        _handleHover() {
          this.tag("Descrementbutton")?.patch({ scale: 3.5 });
          this.tag("Descrementbutton")?.setSmooth("color", 0xff0000ff);
        }
        override _handleClick() {
          this.count--;
          this.tag("Outputui")?.patch({ text: this.count.toString() });
          console.log("decrement focused");
        }
      },
    ];
  }
}
