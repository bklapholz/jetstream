import { KeyboardEvent, SyntheticEvent } from 'react';
import { escapeRegExp } from 'lodash';
import { ListItem } from '@jetstream/types';

export interface SelectMenuItemFromKeyboardOptions {
  key: string;
  keyCode: number;
  keyBuffer: KeyBuffer;
  items: ListItem[];
}

export class KeyBuffer {
  /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
  /* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
  // https://github.com/salesforce/design-system-react/blob/master/utilities/key-buffer.js
  private buffer = '';
  private timeout: any;

  getValue(key: string) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    this.timeout = setTimeout(() => {
      this.buffer = '';
    }, 400);

    this.buffer = this.buffer + key;
    return this.buffer;
  }
}

export function trapEvent(event: SyntheticEvent) {
  if (!event) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  if (event.nativeEvent && event.nativeEvent.preventDefault) {
    event.nativeEvent.preventDefault();
  }

  if (event.nativeEvent && event.nativeEvent.stopPropagation) {
    event.nativeEvent.stopPropagation();
  }
}

/**
 * The stopImmediatePropagation() method of the Event interface prevents other listeners of the same event from being called.
 *
 * If several listeners are attached to the same element for the same event type, they are called in the order in which they were added.
 * If stopImmediatePropagation() is invoked during one such call, no remaining listeners will be called.
 */
export function trapEventImmediate(event: SyntheticEvent) {
  if (!event) {
    return;
  }
  if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
    event.nativeEvent.stopImmediatePropagation();
  }
  trapEvent(event);
}

/**
 * Given a list of items (picklist), determine which is selected based on keys user is entering
 * @param param0 {SelectMenuItemFromKeyboardOptions}
 */
export function selectMenuItemFromKeyboard({ key, keyCode, keyBuffer, items }: SelectMenuItemFromKeyboardOptions): number {
  /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
  /* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
  // https://github.com/salesforce/design-system-react/blob/master/utilities/key-letter-menu-item-select.js
  let ch = key || String.fromCharCode(keyCode);

  if (/^[ -~]$/.test(ch)) {
    ch = ch.toLowerCase();
  } else {
    ch = null;
  }

  const pattern = keyBuffer.getValue(ch);
  let consecutive = 0;
  let focusedIndex: number;

  // Support for navigating to the next option of the same letter with repeated presses of the same key
  if (pattern.length > 1 && new RegExp(`^[${escapeRegExp(ch)}]+$`).test(pattern)) {
    consecutive = pattern.length;
  }

  items.forEach((item, i) => {
    const itemLabel = String(item.label).toLowerCase();

    if (
      (focusedIndex === undefined && itemLabel.substr(0, pattern.length) === pattern) ||
      (consecutive > 0 && itemLabel.substr(0, 1) === ch)
    ) {
      consecutive -= 1;
      focusedIndex = i;
    }
  });

  return focusedIndex;
}

export function isAKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'a' || event.key === 'A' || event.keyCode === 65;
}

export function isArrowLeftKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'ArrowLeft' || event.keyCode === 37;
}
export function isArrowUpKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'ArrowUp' || event.keyCode === 38;
}
export function isArrowRightKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'ArrowRight' || event.keyCode === 39;
}
export function isArrowDownKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'ArrowDown' || event.keyCode === 40;
}
export function isHomeKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'Home' || event.keyCode === 36;
}
export function isEndKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'End' || event.keyCode === 35;
}

export function isEnterKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'Enter' || event.keyCode === 13;
}

export function isSpaceKey(event: KeyboardEvent<unknown>): boolean {
  return event.keyCode === 32;
}

export function isEnterOrSpace(event: KeyboardEvent<unknown>): boolean {
  return isEnterKey(event) || isSpaceKey(event);
}

export function isEscapeKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'Escape' || event.keyCode === 27;
}

export function isPageUpKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'PageUp' || event.keyCode === 33;
}

export function isPageDownKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'PageDown' || event.keyCode === 34;
}

export function isShiftKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'Shift' || event.keyCode === 16;
}

export function isControlKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'Control' || event.keyCode === 17;
}

export function isTabKey(event: KeyboardEvent<unknown>): boolean {
  return event.key === 'Tab' || event.keyCode === 9;
}

export function hasAltModifierKey(event: KeyboardEvent<unknown>): boolean {
  return event.altKey;
}
export function hasMetaModifierKey(event: KeyboardEvent<unknown>): boolean {
  return event.metaKey;
}
export function hasCtrlModifierKey(event: KeyboardEvent<unknown>): boolean {
  return event.ctrlKey;
}

export function hasShiftModifierKey(event: KeyboardEvent<unknown>): boolean {
  return event.shiftKey;
}

// excludes shift
export function hasModifierKey(event: KeyboardEvent<unknown>) {
  return hasAltModifierKey(event) || hasMetaModifierKey(event) || hasCtrlModifierKey(event);
}