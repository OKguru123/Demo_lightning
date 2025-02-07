import { Colors, Lightning } from "@lightningjs/sdk";
import Color from "@lightningjs/sdk/src/Colors";
import { CounterDiv } from "./CounterdivUI";
interface CountTemplateSpec extends Lightning.Component.TemplateSpec {
  Label: object;
  Closebutton: object;
  Newdiv: typeof CounterDiv;
}

export class Count
  extends Lightning.Component<CountTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<CountTemplateSpec>
{
  readonly Newdiv = this.getByRef("Newdiv") as CounterDiv;
  static override _template() {
    return {
      rect: true,
      w: 800,
      h: 600,
      color: Colors("black").get(),
      Label: {
        x: 400,
        y: 300,
        mount: 0.5,

        text: {
          text: "This is the New Component",

          fontSize: 36,
        },
      },
      Closebutton: {
        x: 700,
        y: 50,
        mount: 0.5,
        // color: Colors("transparent").get(),
        text: {
          // textColor: Colors("white").get(),
          text: "close",
          fontSize: 36,
        },
      },

      Newdiv: {
        x: 300,
        y: 50,
        type: CounterDiv,
      },
    };
  }
  override _init() {
    console.log("Close Button Clicked");
    this._setState("closeButonFocused");
  }

  static override _states(): Lightning.Component.Constructor[] {
    return [
      class closeButonFocused extends this {
        Label: any;
        override $enter() {
          // this.tag("Closebutton")?.setSmooth("color", 0xff0000ff);
        }

        override _handleEnter() {
          // this.tag("Closebutton")?.patch({ textColor: Colors("yellow").get() });
          this.tag("Closebutton")?.patch({ scale: 1.5 });
          console.log("Close Button Clicked");
        }
        override _handleDown() {
          console.log("Focused change dto counetrUIfocused");

          this._setState("CounerUIfocused");
        }
        override _handleLeft(e: KeyboardEvent): boolean | void {
          this._setState("NewdivFocus");
        }
      },
      class CounerUIfocused extends this {
        override $enter() {
          this.tag("Closebutton")?.patch({ scale: 1.5 });
          this.tag("Closebutton")?.setSmooth("color", 0xff00ff00);
          this.tag("Label")?.setSmooth("color", 0xff0000ff);
          // this.fireAncestors("$closeui" as any);
        }
        override _handleEnter() {
          // this.tag("Closebutton")?.patch({ scale: 0.5 });
          this.fireAncestors("$closeui" as any);
          console.log("Close Button Clicked");
        }
      },
      class NewdivFocus extends this {
        override $enter() {
          this.tag("Newdiv")?.setSmooth("color", 0xff00ff00);
        }
        override _getFocused() {
          return this.Newdiv;
        }
      },
    ];
  }
}
