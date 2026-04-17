import { tv } from "tailwind-variants";

import { cn } from "@shared/lib/cn";

export { tv };

export type RecipeClassNames<TSlots extends string> = Partial<Record<TSlots, string>>;

type SlotResolver = () => string;
type SlotRecord = Record<string, SlotResolver>;

export function mergeRecipeSlots<TSlots extends SlotRecord>(
  slots: TSlots,
  classNames?: RecipeClassNames<Extract<keyof TSlots, string>>,
) {
  return Object.fromEntries(
    Object.entries(slots).map(([slotName, resolveSlotClassName]) => [
      slotName,
      cn(resolveSlotClassName(), classNames?.[slotName]),
    ]),
  ) as Record<keyof TSlots, string>;
}
