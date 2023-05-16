export const componentAdded = payload => ({type: 'COMPONENT_ADDED', payload});
export const currentlyDragging = payload => ({type: 'CURRENTLY_DRAGGING_CHANGED', payload});
export const selectedIndexChanged = payload => ({type: 'SELECTED_INDEX_CHANGED', payload});
export const exportState = payload => ({type: 'EXPORT_STATE', payload});
export const importState = payload => ({type: 'IMPORT_STATE', payload});
export const fileUrlChanged = payload => ({type: 'FILE_URL', payload});
export const fileError = payload => ({type: 'FILE_ERROR', payload});