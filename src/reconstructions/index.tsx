import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type ReconstructionProps = { onFindEasterEgg?: () => void };

function LoadingPlaceholder() {
  return (
    <div className="flex min-h-full items-center justify-center bg-shell-ink">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-shell-line border-t-shell-brass" />
        <p className="font-display text-xs uppercase tracking-widest text-shell-paper/50">
          Restoring exhibit&hellip;
        </p>
      </div>
    </div>
  );
}

const GoogleReconstruction = dynamic(
  () => import("./google/GoogleReconstruction").then((m) => m.GoogleReconstruction),
  { loading: LoadingPlaceholder }
);
const FacebookReconstruction = dynamic(
  () => import("./facebook/FacebookReconstruction").then((m) => m.FacebookReconstruction),
  { loading: LoadingPlaceholder }
);
const YoutubeReconstruction = dynamic(
  () => import("./youtube/YoutubeReconstruction").then((m) => m.YoutubeReconstruction),
  { loading: LoadingPlaceholder }
);
const TwitterReconstruction = dynamic(
  () => import("./twitter/TwitterReconstruction").then((m) => m.TwitterReconstruction),
  { loading: LoadingPlaceholder }
);
const MyspaceReconstruction = dynamic(
  () => import("./myspace/MyspaceReconstruction").then((m) => m.MyspaceReconstruction),
  { loading: LoadingPlaceholder }
);
const GeocitiesReconstruction = dynamic(
  () => import("./geocities/GeocitiesReconstruction").then((m) => m.GeocitiesReconstruction),
  { loading: LoadingPlaceholder }
);
const IphoneReconstruction = dynamic(
  () => import("./iphone/IphoneReconstruction").then((m) => m.IphoneReconstruction),
  { loading: LoadingPlaceholder }
);
const AndroidReconstruction = dynamic(
  () => import("./android/AndroidReconstruction").then((m) => m.AndroidReconstruction),
  { loading: LoadingPlaceholder }
);
const GmailReconstruction = dynamic(
  () => import("./gmail/GmailReconstruction").then((m) => m.GmailReconstruction),
  { loading: LoadingPlaceholder }
);
const YahooReconstruction = dynamic(
  () => import("./yahoo/YahooReconstruction").then((m) => m.YahooReconstruction),
  { loading: LoadingPlaceholder }
);

/**
 * Adding a new exhibit's reconstruction is just one more entry here —
 * nothing else in the app needs to change.
 */
export const RECONSTRUCTIONS: Record<string, ComponentType<ReconstructionProps>> = {
  google: GoogleReconstruction,
  facebook: FacebookReconstruction,
  youtube: YoutubeReconstruction,
  twitter: TwitterReconstruction,
  myspace: MyspaceReconstruction,
  geocities: GeocitiesReconstruction,
  iphone: IphoneReconstruction,
  android: AndroidReconstruction,
  gmail: GmailReconstruction,
  yahoo: YahooReconstruction,
};
