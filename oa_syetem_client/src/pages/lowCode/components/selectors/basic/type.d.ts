interface TextAlign {
  left: string;
  center: string;
  right: string;
  justify: string;
}

type textAlign = keyof TextAlign;

export interface TextProps {
  text: string;
  fontSize: number;
  textAlign: textAlign;
}
