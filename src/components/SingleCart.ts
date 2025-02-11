import { Colors, Lightning } from "@lightningjs/sdk";
interface SingleCardTemplateSpec extends Lightning.Component.TemplateSpec {
  Letter: object;
}

export class SingleCard
  extends Lightning.Component<SingleCardTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<SingleCardTemplateSpec>
{
  private _letter: string = "";
  private _activeindex: number = 0;
  private _isFocused: boolean = false;

  static override _template() {
    return {
      collision: true,
      w: 200,
      h: 160,
      x: 100,

      flexItem: { margin: 7 },
      rect: true,
      color: Colors("blue").get(),
      Letter: {
        collision: true,
        mount: 0.5, // Centers the text
        x: 100, // Centers horizontally
        y: 80, // Centers vertically
        text: {
          text: "", // Initially empty
          fontSize: 64,
          textColor: Colors("white").get(),
        },
      },
    };
  }

  set letter1(value: string) {
    this.tag("Letter")?.patch({ text: { text: value } });
  }
  set indexpass(value: number) {
    this._activeindex = value;
  }
  set isFocused(value: boolean) {
    this._isFocused = value;
    this.patch({
      scale: value ? 1.1 : 1,
      color: value ? Colors("black").get() : Colors("blue").get(),
      //   textColor: value ? Colors("green").get():Colors("white").get() ,
    });
    
    value
      ? this.tag("Letter")?.setSmooth("color", Colors("green").get())
      : this.tag("Letter")?.setSmooth("color", Colors("white").get());
    console.log(value, "this will tells the current bvalkue ");
  }
  _handleHover() {
    this.tag("Letter")?.setSmooth("scale", 1.5);
    this.tag("Letter")?.setSmooth("color", Colors("green").get());
  }
  _handleUnhover() {
    this.tag("Letter")?.setSmooth("scale", 1);
    this.tag("Letter")?.setSmooth("color", Colors("white").get());
  }
  _handleClick() {
    console.log("cliked working", this._letter);
    console.log(this._activeindex, "active index");
  }
}
