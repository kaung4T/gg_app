import type { CSSProperties, VNodeChild } from 'vue';
import {
  createTypes,
  toValidableType,
  VueTypesInterface,
  VueTypeValidableDef
} from 'vue-types';

export type VueNode = VNodeChild | JSX.Element;

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
};

const newPropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
}) as PropTypes;

export default class propTypes extends newPropTypes {
  static get style() {
    return toValidableType('style', {
      type: [String, Object]
    });
  }

  static get VNodeChild() {
    return toValidableType('VNodeChild', {
      type: undefined
    });
  }
}
