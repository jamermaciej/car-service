import { AuthEffects } from './auth.effects';
import { RouterEffect } from './router.effects';
import { ProfileEffects } from './../../profile/store/effects/profile.effects';
import { UIEffects } from './../../shared/store/effects/ui.effects';

export const effects: any[] = [RouterEffect, AuthEffects, ProfileEffects, UIEffects];

export * from './router.effects';
export * from './auth.effects';
