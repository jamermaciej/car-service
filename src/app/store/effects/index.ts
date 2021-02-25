import { AuthEffects } from './auth.effects';
import { RouterEffect } from './router.effects';
import { ProfileEffects } from './../../profile/store/effects/profile.effects';

export const effects: any[] = [RouterEffect, AuthEffects, ProfileEffects];

export * from './router.effects';
export * from './auth.effects';
