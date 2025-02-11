import { Colors, Lightning } from "@lightningjs/sdk";
import { SingleCard } from "./components/SingleCart";

interface App2TemplateSpace extends Lightning.Component.TemplateSpec {
  Firstpage: {};
  Gridpage: object;
}
export class App2
  extends Lightning.Component<App2TemplateSpace>
  implements Lightning.Component.ImplementTemplateSpec<App2TemplateSpace>
{
  private _focusIndex = 0; // Track focus
  private _columns = 4;
  static override _template() {
    return {
      Firstpage: {
        w: 1920,
        h: 1080,
        rect: true,
        color: 0xff202020,
      },
      Gridpage: {
        collision: true,
        x: 500,
        y: 200,
        w: 1000,
        h: 700,
        rect: true,
        color: Colors("green").get(),

        flex: {
          direction: "row",
          wrap: true,
        },
        children: [],
      },
    };
  }
  private _buildCards() {
    const letters = ["A", "c", "B", "D", "E", "F", "G", "H"];
    let cartLetters = letters.concat(letters);
    cartLetters = cartLetters.sort(() => Math.random() - 0.5);
    // const columns = 3; // Define number of columns
    // const cardWidth = 120;
    // const cardHeight = 120;

    const cards = cartLetters.map((letter, index) => {
      return {
        type: SingleCard,
        letter1: letter,
        indexpass: index,
        isFocused: index === this._focusIndex,
        // x: (index % columns) * cardWidth, // Columns positioning
        // y: Math.floor(index / columns) * cardHeight, // Row positioning
      };
    });
    if (cards.length > 0) {
      const gridPage = this.tag("Gridpage") as Lightning.Component;
      gridPage.children = cards;
    }
  }

  override _init() {
    this._buildCards();
    this._updateFocus();
  }
  _updateFocus() {
    const grid = this.tag("Gridpage") as Lightning.Component;
    grid.children.forEach((card: any, index: number) => {
      card.patch({ isFocused: index === this._focusIndex });
    });
  }
  override _handleRight() {
    const gridChildren = this.tag("Gridpage")?.children;
    if (gridChildren && this._focusIndex < gridChildren.length - 1) {
      this._focusIndex++;
      this._updateFocus();
    }
  }

  override _handleLeft() {
    if (this._focusIndex > 0) {
      this._focusIndex--;
      this._updateFocus();
    }
  }

  override _handleDown() {
    const gridPage = this.tag("Gridpage");
    if (
      gridPage &&
      this._focusIndex + this._columns < gridPage.children.length
    ) {
      this._focusIndex += this._columns;
      this._updateFocus();
    }
  }

  override _handleUp() {
    if (this._focusIndex - this._columns >= 0) {
      this._focusIndex -= this._columns;
      this._updateFocus();
    }
  }
}
