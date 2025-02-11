import { Colors, Lightning } from "@lightningjs/sdk";
import { withAnnouncer, getHexColor } from "@lightningjs/ui";

const API_URL = "https://api.themoviedb.org/3/trending/all/week?page=1";
const API_KEY_V4 =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGI2MjEwOTRhMzE2MGYzMDM4MDQ5ZmNjNjlmMDE3NiIsIm5iZiI6MTczOTE4MTI1Ni43OTgsInN1YiI6IjY3YTljY2M4MWNhODU4YWUxMTA2MTFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qvXrNP4ry17en-mQA3o3YmEXhyoOFmPax6RO7N1h1jk";
interface LandingPageTemplateSpec extends Lightning.Component.TemplateSpec {
  LandingPage: {
    Background: Object;
    Tranding: object;
  };
}

export class LandingPage
  extends Lightning.Component<LandingPageTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<LandingPageTemplateSpec>
{
  static override _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      zIndex: -900,
      color: getHexColor("092f40"),
    };
  }

  override _init() {
    this.fetchMovies();
  }

  private async fetchMovies() {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY_V4,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Movies Data:", data); // Logs data in console

      this.patch({
        Message: {
          text: { text: "Data Fetched! Check Console" },
        },
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
      this.patch({
        Message: {
          text: { text: "Failed to fetch movies!" },
        },
      });
    }
  }
}
