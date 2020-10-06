import { DndOptions } from '../index';
import { DragLayerCollector, DndComponentEnhancer } from './interfaces';
export declare function DragLayer<RequiredProps, CollectedProps = {}>(collect: DragLayerCollector<RequiredProps, CollectedProps>, options?: DndOptions<RequiredProps>): DndComponentEnhancer<CollectedProps>;
