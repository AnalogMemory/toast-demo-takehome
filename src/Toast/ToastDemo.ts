import { type ToastProps, ToastVariant } from "./types";

let id = 0;

const MESSAGES = [
  `Importing ${'CDR_Mediations_5104983729576938238_10119293477859'}`,
  `The dashboard was moved successfully to ${'Incidents'}`,
  `The folder was moved to ${'Incidents'}`,
  'Reticulating splines...',
  'Breakfast is served.',
  'As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.',
  'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
  'It was a bright cold day in April, and the clocks were striking thirteen.',
  "Ships at a distance have every man's wish on board",
];

export function createDemoToast(): ToastProps {
  const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  const randomVariant = Object.values(ToastVariant)[Math.floor(Math.random() * Object.values(ToastVariant).length)];

  return {
    id: (++id).toString(),
    message: randomMessage,
    variant: randomVariant,
  };
}
