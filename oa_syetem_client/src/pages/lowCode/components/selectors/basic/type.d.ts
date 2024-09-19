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

export interface CardProps {
  text: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  checked: boolean;
  owner: string;
}

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

console.log(`11111`, loggingIdentity(1));
