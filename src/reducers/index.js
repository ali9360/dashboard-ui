import _ from 'lodash';
const defaultState = {
    components: [],
    currentlyDragging: '',
    selectedIndex: -1,
    exportState: false,
    importState: false,
    fileUrl: '',
    fileError: false
}

export default function rootReducer(state = defaultState, action){
    const duplicateState = _.cloneDeep(state);
    switch(action.type){
        case 'COMPONENT_ADDED':
            duplicateState.components.push(action.payload);
            return duplicateState;
        case 'CURRENTLY_DRAGGING_CHANGED':
            duplicateState.currentlyDragging = action.payload;
            return duplicateState;
        case 'SELECTED_INDEX_CHANGED':
            duplicateState.selectedIndex = action.payload;
            return duplicateState;
        case 'EXPORT_STATE':
            duplicateState.exportState = action.payload;
            return duplicateState;
        case 'IMPORT_STATE':
            duplicateState.importState = action.payload;
            return duplicateState;
        case 'FILE_URL':
            duplicateState.fileUrl = action.payload;
            return duplicateState;
        case 'FILE_ERROR':
            duplicateState.fileError = action.payload;
            return duplicateState;
        default:
            return duplicateState;
    }
}