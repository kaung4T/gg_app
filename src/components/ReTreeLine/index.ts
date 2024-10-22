import { isFunction } from '@pureadmin/utils';
import { h, defineComponent } from 'vue';
import type { PropType } from 'vue';
import './index.scss';
import type {
  TreeNode,
  TreeData,
  TreeNodeData
} from 'element-plus/es/components/tree-v2/src/types';

export default defineComponent({
  name: 'ReTreeLine',
  props: {
    node: {
      type: Object as PropType<TreeNode>,
      required: true
    },
    data: {
      type: Array as PropType<TreeNodeData>,
      default: () => {}
    },
    treeData: {
      type: Array as PropType<TreeData>,
      default: () => []
    },
    indent: {
      type: Number,
      default: 16
    },
    showLabelLine: {
      type: Boolean,
      default: true
    }
  },
  setup(_, context) {
    const { slots } = context;
    const getScopedSlot = slotName => {
      if (!slotName) {
        return null;
      }
      const slotNameSplits = slotName.split('||');
      let slot = null;
      for (let index = 0; index < slotNameSplits.length; index++) {
        const name = slotNameSplits[index];
        slot = (slots || {})[name];
      }
      return slot;
    };
    const getSlotValue = (slot, scopedData, defaultNode = null) => {
      if (isFunction(slot)) {
        return slot(scopedData) || defaultNode;
      }
      return slot || defaultNode;
    };

    return {
      getScopedSlot,
      getSlotValue
    };
  },
  render() {
    const scopeSlotDefault = this.getScopedSlot('default');

    const labelSlot = this.getScopedSlot('node-label');

    const afterLabelSlot = this.getScopedSlot('after-node-label');
    const labelNodes = scopeSlotDefault
      ? this.getSlotValue(scopeSlotDefault, {
          node: this.node,
          data: this.data
        })
      : [
          labelSlot
            ? this.getSlotValue(labelSlot, {
                node: this.node,
                data: this.data
              })
            : h('span', { class: 'element-tree-node-label' }, this.node.label),
          this.showLabelLine
            ? h('span', {
                class: 'element-tree-node-label-line'
              })
            : null,
          this.getSlotValue(afterLabelSlot, {
            node: this.node,
            data: this.data
          })
        ];

    const lastnodeArr = [];
    let currentNode = this.node;
    while (currentNode) {
      let parentNode = currentNode.parent;

      if (currentNode.level === 1 && !currentNode.parent) {
        if (!this.treeData || !Array.isArray(this.treeData)) {
          throw Error(
            'if you using el-tree-v2 (Virtualized Tree) of element-plus,element-tree-line required data.'
          );
        }
        parentNode = {
          children: Array.isArray(this.treeData)
            ? this.treeData.map(item => {
                return { ...item, key: item.id };
              })
            : [],
          level: 0,
          key: 'node-0',
          parent: null
        };
      }
      if (parentNode) {
        const index = (parentNode.children || parentNode.childNodes).findIndex(
          item => (item.key || item.id) === (currentNode.key || currentNode.id)
        );
        lastnodeArr.unshift(
          index === (parentNode.children || parentNode.childNodes).length - 1
        );
      }
      currentNode = parentNode;
    }
    const lineNodes = [];
    for (let i = 0; i < this.node.level; i++) {
      lineNodes.push(
        h('span', {
          class: {
            'element-tree-node-line-ver': true,
            'last-node-line': lastnodeArr[i] && this.node.level - 1 !== i,
            'last-node-isLeaf-line': lastnodeArr[i] && this.node.level - 1 === i
          },
          style: { left: this.indent * i + 'px' }
        })
      );
    }
    return h(
      'span',
      {
        class: 'element-tree-node-label-wrapper'
      },
      [labelNodes].concat(lineNodes).concat([
        h('span', {
          class: 'element-tree-node-line-hor',
          style: {
            width: (this.node.isLeaf ? 24 : 8) + 'px',
            left: (this.node.level - 1) * this.indent + 'px'
          }
        })
      ])
    );
  }
});
