<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

export default {
  name: 'SimpleKeyboard',
  props: {
    keyboardClass: {
      default: 'simple-keyboard',
      type: String,
    },
    input: {
      type: String,
    },
    maxLength: {
      default: 100,
      type: Number,
    },
  },
  data: () => ({
    keyboard: null,
  }),
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      maxLength: this.maxLength,
      layout: {
        default: [
          '1 2 3 4 5 6 7 8 9 0',
          'Q W E R T Y U I O P {bksp}',
          'A S D F G H J K L \'',
          'Z X C V B N M , .',
          '{space}',
        ],
      },
      display: {
        '{shift}': '⇧',
        '{shiftactivated}': '⇧',
        '{enter}': '↵',
        '{bksp}': '⌫',
        '{space}': ' ',
      },
    });
    this.keyboard.setInput(this.input);
  },
  methods: {
    onChange(input) {
      this.$emit('onChange', input);
      this.keyboard.setInput(input);
    },
    onKeyPress(button) {
      this.$emit('onKeyPress', button);

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === '{shift}' || button === '{lock}') this.handleShift();
    },
    handleShift() {
      const currentLayout = this.keyboard.options.layoutName;
      const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

      this.keyboard.setOptions({
        layoutName: shiftToggle,
      });
    },
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.simple-keyboard
  width: fit-content
  font: inherit
  font-weight: 600
  ::v-deep(.hg-row)
    justify-content: center
    .hg-button
      flex-grow: 0 !important
      width: 60px
      height: 60px
      font-size: 25px
    .hg-button-space
      width: 350px
</style>
