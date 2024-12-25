import PageA from "./components/PageA";
import PageB from "./components/PageB";
import PageC from "./components/PageC";

export const GAP_LEFT = "S1";
export const GAP_RIGHT = "S2";
export const LIGHT_HOUSE = "P0";
export const BUSINESS_CONTENT = "P123";
export const SUCCESS_LEFT = "P4.1";
export const SUCCESS_RIGHT = "P4.2";
export const BUSINESS_LEFT = "P5.1";
export const BUSINESS_RIGHT = "P5.2";
export const REPORT_TOPIC = "P6";

export const pageCompMap = {
  [GAP_LEFT]: PageA,
  [GAP_RIGHT]: PageB,
  [LIGHT_HOUSE]: PageC,
  [BUSINESS_CONTENT]: PageA,
  [SUCCESS_LEFT]: PageB,
  [SUCCESS_RIGHT]: PageC,
  [BUSINESS_LEFT]: PageA,
  [BUSINESS_RIGHT]: PageB,
  [REPORT_TOPIC]: PageC,
};
