import { describe, it, expect } from 'vitest';

import { getPasswordStrength } from './passwordStrength';

describe('getPasswordStrength', () => {
  it('returns score 0 for empty string', () => {
    const result = getPasswordStrength('');
    expect(result.score).toBe(0);
    expect(result.hasNumber).toBe(false);
    expect(result.hasUppercase).toBe(false);
    expect(result.hasLowercase).toBe(false);
    expect(result.hasSpecialChar).toBe(false);
  });

  it('detects number', () => {
    const result = getPasswordStrength('1');
    expect(result.hasNumber).toBe(true);
    expect(result.score).toBe(1);
  });

  it('detects uppercase', () => {
    const result = getPasswordStrength('A');
    expect(result.hasUppercase).toBe(true);
    expect(result.score).toBe(1);
  });

  it('detects lowercase', () => {
    const result = getPasswordStrength('a');
    expect(result.hasLowercase).toBe(true);
    expect(result.score).toBe(1);
  });

  it('detects special character', () => {
    const result = getPasswordStrength('!');
    expect(result.hasSpecialChar).toBe(true);
    expect(result.score).toBe(1);
  });

  it('returns score 4 for strong password', () => {
    const result = getPasswordStrength('Abcd1!');
    expect(result.score).toBe(4);
    expect(result.hasNumber).toBe(true);
    expect(result.hasUppercase).toBe(true);
    expect(result.hasLowercase).toBe(true);
    expect(result.hasSpecialChar).toBe(true);
  });

  it('returns score 2 for partial password', () => {
    const result = getPasswordStrength('abc123');
    expect(result.score).toBe(2);
    expect(result.hasNumber).toBe(true);
    expect(result.hasLowercase).toBe(true);
    expect(result.hasUppercase).toBe(false);
    expect(result.hasSpecialChar).toBe(false);
  });
});
