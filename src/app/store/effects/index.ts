import { AuthEffects } from './auth.effects';
import { RouterEffect } from './router.effects';

export const effects: any[] = [RouterEffect, AuthEffects];

export * from './router.effects';
export * from './auth.effects';
