import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    documentos:[{}],
    docsAprobados:[{}],
    docsRechazados:[{}]
}
export const documentoSlice = createSlice({
    name: "Documento",
    initialState,
    reducers:{
        addDocument:(state, action)=>{
            const {documentos} = action.payload;
            state.documentos = documentos
        },
        getDocsAprobados:(state, action)=>{
            const {documentos} = action.payload;
            state.docsAprobados = documentos
        },
        getDocsRechazados:(state, action)=>{
            const {documentos} = action.payload;
            state.docsRechazados = documentos
        },

    }
})

export const {addDocument, getDocsAprobados, getDocsRechazados} = documentoSlice.actions;
export default documentoSlice.reducer;