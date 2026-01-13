# 🎮 Button System Testing Guide

## Quick Start Test

Open browser console (F12) and check:
```javascript
// 1. Verify keyboard navigation manager is initialized
console.log(typeof keyboardNav !== 'undefined' ? '✅ Keyboard manager loaded' : '❌ Failed');

// 2. Check button count
console.log(`Found ${document.querySelectorAll('[role="button"]').length} buttons`);

// 3. Test button trigger
console.log('Click a button - check console for "Button triggered"');
```

## Testing by Input Method

### 🖱️ **Mouse Testing**

**Hover Effects:**
- [ ] Hover over any button
- [ ] Button should scale smoothly to 1.05x size
- [ ] Background should brighten
- [ ] Glow effect should intensify

**Click Feedback:**
- [ ] Click button
- [ ] Button should scale down to 0.95x
- [ ] Should immediately trigger action
- [ ] Console should show "Button triggered"

**Focus Ring (when using Tab):**
- [ ] Press Tab to focus a button
- [ ] Should see cyan outline around button
- [ ] Outline should be 3px thick
- [ ] Should have 2px offset from button edge

---

### 📱 **Touch Testing** (Mobile/Tablet)

**Single Tap:**
- [ ] Tap button once
- [ ] Should see opacity change to 0.85
- [ ] Button should slightly scale
- [ ] Action should trigger on tap release

**Long Press:**
- [ ] Press and hold button
- [ ] Visual feedback should persist
- [ ] Release to complete action

**Multi-touch:**
- [ ] Test buttons while scrolling nearby
- [ ] Buttons should not interfere
- [ ] Scrolling should not trigger buttons

**Zoom Prevention:**
- [ ] Double-tap on button
- [ ] Should NOT zoom the page
- [ ] Button should activate instead

**Button Sizes (Mobile):**
- [ ] Pause button: 56px × 56px minimum
- [ ] ULT button: 70px × 70px minimum
- [ ] Menu buttons: 52px tall minimum

---

### ⌨️ **Keyboard Testing**

**Tab Navigation:**
- [ ] Press Tab key repeatedly
- [ ] Focus cycles through visible buttons
- [ ] Cyan outline shows which button is focused
- [ ] Focus should skip hidden buttons
- [ ] Wrap around to first button at end

**Reverse Tab (Shift+Tab):**
- [ ] Hold Shift and press Tab
- [ ] Focus moves backwards
- [ ] Should go to previous button
- [ ] Wrap to last button at beginning

**Activate Button:**
- [ ] Tab to focus a button
- [ ] Press Enter key
- [ ] Button should trigger
- [ ] OR press Space key
- [ ] Button should trigger

**Escape Key:**
- [ ] In game, press Escape
- [ ] Should open pause menu
- [ ] Press Escape again
- [ ] Should close pause menu

---

### 🎮 **Game-Specific Tests**

**Main Menu:**
- [ ] Click "DEPLOY UNIT" - starts game
- [ ] Keyboard Tab+Enter - starts game
- [ ] Mobile tap - starts game

**Pause Button (Top Right):**
- [ ] Click pause button during game
- [ ] Game should pause
- [ ] Menu should appear
- [ ] Tab to buttons in pause menu
- [ ] Press Enter to select

**ULT Button (Bottom Center):**
- [ ] Build up ULT charge (kill enemies)
- [ ] When ULT is ready (border glows pink):
  - [ ] Click to activate
  - [ ] Keyboard Enter/Space
  - [ ] Mobile tap
- [ ] ULT should trigger immediately

**Shop/Menu Navigation:**
- [ ] Click items in menu
- [ ] Hover over items (mouse)
- [ ] Tab through items (keyboard)
- [ ] Tap items (touch)

---

## Accessibility Features Check

### Focus Indicators
- [ ] Tab through buttons
- [ ] See clear outline on focused button
- [ ] Outline is NOT visible on hover (mouse)
- [ ] Outline IS visible on keyboard

### High Contrast Support
- [ ] On Windows: Activate High Contrast mode
- [ ] Buttons should have thicker borders
- [ ] Text should be bolder
- [ ] Colors should remain distinct

### Reduced Motion Support
- [ ] On system settings: Enable "Reduce Motion"
- [ ] Buttons should NOT animate
- [ ] Hover should be instant, not smooth
- [ ] Transitions should be minimal

### Color Scheme Preference
- [ ] On system settings: Set to Dark Mode
- [ ] Buttons should adjust colors
- [ ] Should remain readable
- [ ] Contrast should be maintained

---

## Cross-Device Testing

### Desktop
- [ ] Windows Chrome
- [ ] Windows Firefox
- [ ] Mac Safari
- [ ] Mac Chrome
- [ ] Linux Firefox

### Tablet
- [ ] iPad (landscape)
- [ ] iPad (portrait)
- [ ] Android tablet (landscape)
- [ ] Android tablet (portrait)

### Mobile
- [ ] iPhone (landscape)
- [ ] iPhone (portrait)
- [ ] Android phone (landscape)
- [ ] Android phone (portrait)
- [ ] Small screen (<320px width)
- [ ] Large screen (>1200px width)

### Hybrid Devices
- [ ] Touch and keyboard (keyboard attached)
- [ ] Touch and mouse simultaneously
- [ ] Switch between inputs

---

## Performance Check

### Browser Console
```javascript
// Check setup performance
console.time('button-setup');
setupButtonHandlers();
console.timeEnd('button-setup');
// Should be <10ms

// Check event response time
console.time('button-click');
document.querySelector('button').click();
console.timeEnd('button-click');
// Should be <1ms
```

### Visual Performance
- [ ] No lag when clicking buttons
- [ ] Smooth animations (60fps)
- [ ] No frame drops during hover
- [ ] Touch response is instant (<100ms)

---

## Problem Detection

### Button Not Responding
1. Check console for errors: F12 → Console
2. Verify button has `onclick` attribute
3. Try clicking again
4. Check if button is inside hidden div

### Focus Not Visible
1. Make sure Tab key was pressed (not mouse)
2. Check if browser supports `:focus-visible`
3. Verify CSS was loaded (F12 → Styles)

### Touch Not Working
1. Enable developer mode on mobile
2. Check for console errors
3. Verify touch events fire (add listeners)
4. Test on different browser

### Keyboard Navigation Broken
1. Refresh page (F5)
2. Try Tab key multiple times
3. Check if game is not capturing key events
4. Test in different menu screen

---

## Console Logging Reference

When you click a button, console should show:
```
Button triggered: [button-name] via click
Button triggered: [button-name] via touch
Button triggered: [button-name] via keyboard
```

### Setup Logs
```
🎮 Initializing accessible button system...
✓ Button system initialized with MutationObserver & keyboard navigation
```

### Debug Mode
Enable detailed logging:
```javascript
// In console:
const originalTrigger = triggerButton;
triggerButton = function(el) {
    console.log('TRIGGERED:', el.tagName, el.id, el.innerText, new Error().stack);
    return originalTrigger(el);
}
```

---

## Troubleshooting

### Issue: Buttons appear too small on mobile
**Solution:** Check CSS media query for `@media (max-width: 768px)`

### Issue: Focus outline hard to see
**Solution:** Press Tab again, outline should be bright cyan

### Issue: Double-tap zooms instead of clicking
**Solution:** Check if `touch-action: manipulation` is applied

### Issue: Touch lag on slow devices
**Solution:** Use passive event listeners (already implemented)

### Issue: Keyboard navigation cycles too fast
**Solution:** This is normal - use Tab more slowly

---

## Success Criteria

✅ All tests pass if:
- [ ] Buttons respond to mouse clicks instantly
- [ ] Buttons respond to keyboard (Tab/Enter/Space)
- [ ] Buttons respond to touch taps
- [ ] Hover effects smooth on desktop
- [ ] Focus outline visible on keyboard
- [ ] No focus outline on mouse/touch
- [ ] No console errors
- [ ] Works on all devices tested
- [ ] Touch targets minimum 48x48px
- [ ] Game logic unchanged
- [ ] All menus accessible
- [ ] All game features work

---

## Report Issues

If you find a problem, include:
1. Device/browser (e.g., "iPhone 12 Safari")
2. Input method (mouse/keyboard/touch)
3. Button name (e.g., "DEPLOY UNIT")
4. Expected behavior
5. Actual behavior
6. Console error messages (if any)

Example:
```
Device: Android Chrome
Button: "DEPLOY UNIT"
Input: Touch tap
Expected: Game starts
Actual: Nothing happens
Error: [paste from console]
```
