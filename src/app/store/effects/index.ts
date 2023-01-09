import { AuthEffects } from './auth.effects';
import { RouterEffect } from './router.effects';
import { UIEffects } from './../../shared/store/effects/ui.effects';

export const effects: any[] = [RouterEffect, AuthEffects, UIEffects];

export * from './router.effects';
export * from './auth.effects';
