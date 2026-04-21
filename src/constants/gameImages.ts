import { CardImageId, AvatarId } from "@/types/game";

/** Product images for cards — lives at public/card/product-{n}.png */
export const CARD_IMAGES: CardImageId[] = [
  "product-1",
  "product-2",
  "product-3",
  "product-4",
  "product-5",
  "product-6",
];

export const getCardImageSrc = (imageId: CardImageId): string =>
  `/card/${imageId}.png`;

/** Avatar images for player — lives at public/icons/profile-{n}.png */
export const getAvatarImageSrc = (avatarId: AvatarId): string =>
  `/icons/${avatarId}.png`;
