/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./redux_tool/extractToken.tsx":
/*!*************************************!*\
  !*** ./redux_tool/extractToken.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   parseJwt: () => (/* binding */ parseJwt)\n/* harmony export */ });\nfunction parseJwt(token) {\n    if (!token) {\n        return;\n    }\n    const base64Url = token.split(\".\")[1];\n    const base64 = base64Url.replace(\"-\", \"+\").replace(\"_\", \"/\");\n    return JSON.parse(window.atob(base64));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1eF90b29sL2V4dHJhY3RUb2tlbi50c3giLCJtYXBwaW5ncyI6Ijs7OztBQUFPLFNBQVNBLFNBQVNDLEtBQWM7SUFDbkMsSUFBSSxDQUFDQSxPQUFPO1FBQUU7SUFBUTtJQUN0QixNQUFNQyxZQUFZRCxNQUFNRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDckMsTUFBTUMsU0FBU0YsVUFBVUcsT0FBTyxDQUFDLEtBQUssS0FBS0EsT0FBTyxDQUFDLEtBQUs7SUFDeEQsT0FBT0MsS0FBS0MsS0FBSyxDQUFDQyxPQUFPQyxJQUFJLENBQUNMO0FBQ2xDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3BpbnNob3QvLi9yZWR1eF90b29sL2V4dHJhY3RUb2tlbi50c3g/M2Q4MCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcGFyc2VKd3QodG9rZW4gOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRva2VuKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XG4gICAgY29uc3QgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoJy0nLCAnKycpLnJlcGxhY2UoJ18nLCAnLycpO1xuICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKGJhc2U2NCkpO1xufSJdLCJuYW1lcyI6WyJwYXJzZUp3dCIsInRva2VuIiwiYmFzZTY0VXJsIiwic3BsaXQiLCJiYXNlNjQiLCJyZXBsYWNlIiwiSlNPTiIsInBhcnNlIiwid2luZG93IiwiYXRvYiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./redux_tool/extractToken.tsx\n");

/***/ }),

/***/ "./redux_tool/redusProfile/profileSlice.tsx":
/*!**************************************************!*\
  !*** ./redux_tool/redusProfile/profileSlice.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ProfileSlice: () => (/* binding */ ProfileSlice),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   setProfile: () => (/* binding */ setProfile)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _profileThunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profileThunk */ \"./redux_tool/redusProfile/profileThunk.ts\");\n\n\nconst initialState = {\n    profile: {},\n    isLoading: false\n};\nconst ProfileSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n    name: \"Profile\",\n    initialState,\n    reducers: {\n        setProfile: (state, action)=>{\n            state.profile = action.payload;\n        }\n    },\n    extraReducers: (builder)=>{\n        builder.addCase(_profileThunk__WEBPACK_IMPORTED_MODULE_1__.getProfile.pending, (state, action)=>{\n            state.isLoading = true;\n        }).addCase(_profileThunk__WEBPACK_IMPORTED_MODULE_1__.getProfile.fulfilled, (state, action)=>{\n            state.profile = action.payload;\n        }).addCase(_profileThunk__WEBPACK_IMPORTED_MODULE_1__.getProfile.rejected, (state, action)=>{\n            state.isLoading = false;\n        });\n    }\n});\n// Action creators are generated for each case reducer function\nconst { setProfile } = ProfileSlice.actions;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileSlice.reducer);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1eF90b29sL3JlZHVzUHJvZmlsZS9wcm9maWxlU2xpY2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUErQztBQUtIO0FBTzVDLE1BQU1FLGVBQTZCO0lBQ2pDQyxTQUFTLENBQUM7SUFDVkMsV0FBVztBQUNiO0FBRU8sTUFBTUMsZUFBZUwsNkRBQVdBLENBQUM7SUFDdENNLE1BQU07SUFDTko7SUFDQUssVUFBVTtRQUNSQyxZQUFZLENBQUNDLE9BQU9DO1lBQ2xCRCxNQUFNTixPQUFPLEdBQUdPLE9BQU9DLE9BQU87UUFDaEM7SUFDRjtJQUNBQyxlQUFlLENBQUNDO1FBQ2RBLFFBQ0dDLE9BQU8sQ0FBQ2IscURBQVVBLENBQUNjLE9BQU8sRUFBRSxDQUFDTixPQUFPQztZQUNuQ0QsTUFBTUwsU0FBUyxHQUFHO1FBQ3BCLEdBQ0NVLE9BQU8sQ0FBQ2IscURBQVVBLENBQUNlLFNBQVMsRUFBRSxDQUFDUCxPQUFPQztZQUNyQ0QsTUFBTU4sT0FBTyxHQUFHTyxPQUFPQyxPQUFPO1FBQ2hDLEdBQ0NHLE9BQU8sQ0FBQ2IscURBQVVBLENBQUNnQixRQUFRLEVBQUUsQ0FBQ1IsT0FBT0M7WUFDcENELE1BQU1MLFNBQVMsR0FBRztRQUNwQjtJQUNKO0FBQ0YsR0FBRztBQUVILCtEQUErRDtBQUN4RCxNQUFNLEVBQUVJLFVBQVUsRUFBRSxHQUFHSCxhQUFhYSxPQUFPLENBQUM7QUFDbkQsaUVBQWViLGFBQWFjLE9BQU8sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwaW5zaG90Ly4vcmVkdXhfdG9vbC9yZWR1c1Byb2ZpbGUvcHJvZmlsZVNsaWNlLnRzeD9hZjcyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNsaWNlIH0gZnJvbSBcIkByZWR1eGpzL3Rvb2xraXRcIjtcbmltcG9ydCB0eXBlIHsgUGF5bG9hZEFjdGlvbiB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCI7XG5pbXBvcnQgeyBvYmpUeXBlIH0gZnJvbSBcIi4uLy4uL3NyYy9wYWdlcy9wcm9maWxlL2ludGVyZmFjZXNcIjtcbmltcG9ydCBMZXZsZSBmcm9tIFwiQC9wYWdlcy9wcm9maWxlL2xldmVsXCI7XG5pbXBvcnQgeyBnZXQgfSBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0IHsgZ2V0UHJvZmlsZSB9IGZyb20gXCIuL3Byb2ZpbGVUaHVua1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2ZpbGVTdGF0ZSB7XG4gIHByb2ZpbGU6IGFueTtcbiAgaXNMb2FkaW5nOiBib29sZWFuO1xufVxuXG5jb25zdCBpbml0aWFsU3RhdGU6IFByb2ZpbGVTdGF0ZSA9IHtcbiAgcHJvZmlsZToge30sXG4gIGlzTG9hZGluZzogZmFsc2UsXG59O1xuXG5leHBvcnQgY29uc3QgUHJvZmlsZVNsaWNlID0gY3JlYXRlU2xpY2Uoe1xuICBuYW1lOiBcIlByb2ZpbGVcIixcbiAgaW5pdGlhbFN0YXRlLFxuICByZWR1Y2Vyczoge1xuICAgIHNldFByb2ZpbGU6IChzdGF0ZSwgYWN0aW9uOiBQYXlsb2FkQWN0aW9uPGFueT4pID0+IHtcbiAgICAgIHN0YXRlLnByb2ZpbGUgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICB9LFxuICB9LFxuICBleHRyYVJlZHVjZXJzOiAoYnVpbGRlcikgPT4ge1xuICAgIGJ1aWxkZXJcbiAgICAgIC5hZGRDYXNlKGdldFByb2ZpbGUucGVuZGluZywgKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIH0pXG4gICAgICAuYWRkQ2FzZShnZXRQcm9maWxlLmZ1bGZpbGxlZCwgKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgICAgc3RhdGUucHJvZmlsZSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgfSlcbiAgICAgIC5hZGRDYXNlKGdldFByb2ZpbGUucmVqZWN0ZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIHN0YXRlLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gIH0sXG59KTtcblxuLy8gQWN0aW9uIGNyZWF0b3JzIGFyZSBnZW5lcmF0ZWQgZm9yIGVhY2ggY2FzZSByZWR1Y2VyIGZ1bmN0aW9uXG5leHBvcnQgY29uc3QgeyBzZXRQcm9maWxlIH0gPSBQcm9maWxlU2xpY2UuYWN0aW9ucztcbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVTbGljZS5yZWR1Y2VyO1xuIl0sIm5hbWVzIjpbImNyZWF0ZVNsaWNlIiwiZ2V0UHJvZmlsZSIsImluaXRpYWxTdGF0ZSIsInByb2ZpbGUiLCJpc0xvYWRpbmciLCJQcm9maWxlU2xpY2UiLCJuYW1lIiwicmVkdWNlcnMiLCJzZXRQcm9maWxlIiwic3RhdGUiLCJhY3Rpb24iLCJwYXlsb2FkIiwiZXh0cmFSZWR1Y2VycyIsImJ1aWxkZXIiLCJhZGRDYXNlIiwicGVuZGluZyIsImZ1bGZpbGxlZCIsInJlamVjdGVkIiwiYWN0aW9ucyIsInJlZHVjZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./redux_tool/redusProfile/profileSlice.tsx\n");

/***/ }),

/***/ "./redux_tool/redusProfile/profileThunk.ts":
/*!*************************************************!*\
  !*** ./redux_tool/redusProfile/profileThunk.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getProfile: () => (/* binding */ getProfile)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _extractToken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../extractToken */ \"./redux_tool/extractToken.tsx\");\n\n\n\nconst getProfile = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)(\"profile\", async ()=>{\n    try {\n        const token = localStorage.getItem(\"token\");\n        console.log(token);\n        if (token) {\n            const my_token = (0,_extractToken__WEBPACK_IMPORTED_MODULE_2__.parseJwt)(token);\n            const id = my_token.sub;\n            console.log(my_token);\n            const respo = await axios__WEBPACK_IMPORTED_MODULE_1___default().get(`http://e3r10p13.1337.ma:3000/users/profile/1b227993-6fb7-4f08-8cf4-899b745bfb26`, {\n                headers: {\n                    \"Authorization\": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikplc3N5Y2FfTHluY2giLCJzdWIiOiIxYjIyNzk5My02ZmI3LTRmMDgtOGNmNC04OTliNzQ1YmZiMjYiLCJpc3MiOiJzcGluc2hvdCIsImlhdCI6MTY5Njg4MTcxNSwiZXhwIjoxNjk2OTY4MTE1fQ.BcphZxRWilg2GouIL5FzDEo4Tkayqx8L_bQfPicaPPQ`\n                }\n            });\n            return respo.data;\n        }\n    } catch (error) {\n        console.log(error);\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1eF90b29sL3JlZHVzUHJvZmlsZS9wcm9maWxlVGh1bmsudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQW9EO0FBRzFCO0FBQ2M7QUFFakMsTUFBTUcsYUFBYUgsa0VBQWdCQSxDQUN0QyxXQUNBO0lBQ0ksSUFBSTtRQUNJLE1BQU1JLFFBQVFDLGFBQWFDLE9BQU8sQ0FBQztRQUNuQ0MsUUFBUUMsR0FBRyxDQUFDSjtRQUNaLElBQUlBLE9BQ0o7WUFDRSxNQUFNSyxXQUFXUCx1REFBUUEsQ0FBQ0U7WUFDMUIsTUFBTU0sS0FBS0QsU0FBU0UsR0FBRztZQUN2QkosUUFBUUMsR0FBRyxDQUFDQztZQUNaLE1BQU1HLFFBQVEsTUFBTVgsZ0RBQVMsQ0FBQyxDQUFDLCtFQUErRSxDQUFDLEVBQUU7Z0JBQy9HYSxTQUFTO29CQUNQLGlCQUFpQixDQUFDLDhQQUE4UCxDQUFDO2dCQUNuUjtZQUNGO1lBQ0EsT0FBT0YsTUFBTUcsSUFBSTtRQUNuQjtJQUNSLEVBQUUsT0FBT0MsT0FBTztRQUNaVCxRQUFRQyxHQUFHLENBQUNRO0lBQ2hCO0FBQ0osR0FDSCIsInNvdXJjZXMiOlsid2VicGFjazovL3NwaW5zaG90Ly4vcmVkdXhfdG9vbC9yZWR1c1Byb2ZpbGUvcHJvZmlsZVRodW5rLnRzPzU2MGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQXN5bmNUaHVuayB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCI7XG5pbXBvcnQgand0X2RlY29kZSBmcm9tIFwiand0LWRlY29kZVwiO1xuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHtwYXJzZUp3dH0gZnJvbSBcIi4uL2V4dHJhY3RUb2tlblwiXG5cbmV4cG9ydCBjb25zdCBnZXRQcm9maWxlID0gY3JlYXRlQXN5bmNUaHVuayhcbiAgICBcInByb2ZpbGVcIixcbiAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG15X3Rva2VuID0gcGFyc2VKd3QodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBteV90b2tlbi5zdWJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG15X3Rva2VuKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvID0gYXdhaXQgYXhpb3MuZ2V0KGBodHRwOi8vZTNyMTBwMTMuMTMzNy5tYTozMDAwL3VzZXJzL3Byb2ZpbGUvMWIyMjc5OTMtNmZiNy00ZjA4LThjZjQtODk5Yjc0NWJmYjI2YCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyIGV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeWJtRnRaU0k2SWtwbGMzTjVZMkZmVEhsdVkyZ2lMQ0p6ZFdJaU9pSXhZakl5TnprNU15MDJabUkzTFRSbU1EZ3RPR05tTkMwNE9UbGlOelExWW1aaU1qWWlMQ0pwYzNNaU9pSnpjR2x1YzJodmRDSXNJbWxoZENJNk1UWTVOamc0TVRjeE5Td2laWGh3SWpveE5qazJPVFk0TVRFMWZRLkJjcGhaeFJXaWxnMkdvdUlMNUZ6REVvNFRrYXlxeDhMX2JRZlBpY2FQUFFgLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LClcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwby5kYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbilcbiJdLCJuYW1lcyI6WyJjcmVhdGVBc3luY1RodW5rIiwiYXhpb3MiLCJwYXJzZUp3dCIsImdldFByb2ZpbGUiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjb25zb2xlIiwibG9nIiwibXlfdG9rZW4iLCJpZCIsInN1YiIsInJlc3BvIiwiZ2V0IiwiaGVhZGVycyIsImRhdGEiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./redux_tool/redusProfile/profileThunk.ts\n");

/***/ }),

/***/ "./redux_tool/store.tsx":
/*!******************************!*\
  !*** ./redux_tool/store.tsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   store: () => (/* binding */ store)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _redusProfile_profileSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./redusProfile/profileSlice */ \"./redux_tool/redusProfile/profileSlice.tsx\");\n\n\nconst store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({\n    reducer: {\n        Profile: _redusProfile_profileSlice__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1eF90b29sL3N0b3JlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWtEO0FBQ0U7QUFFN0MsTUFBTUUsUUFBUUYsZ0VBQWNBLENBQUM7SUFDbENHLFNBQVM7UUFDUEMsU0FBU0gsa0VBQVNBO0lBR3BCO0FBQ0YsR0FBRyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwaW5zaG90Ly4vcmVkdXhfdG9vbC9zdG9yZS50c3g/MGE3MyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25maWd1cmVTdG9yZSB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCI7XG5pbXBvcnQgRGF0YVNsaWNlIGZyb20gXCIuL3JlZHVzUHJvZmlsZS9wcm9maWxlU2xpY2VcIjtcblxuZXhwb3J0IGNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoe1xuICByZWR1Y2VyOiB7XG4gICAgUHJvZmlsZTogRGF0YVNsaWNlLFxuICAgIC8vIGlmIHlvdSB3YW50IGFkZFxuICAgIFxuICB9LFxufSk7XG5leHBvcnQgdHlwZSBSb290U3RhdGUgPSBSZXR1cm5UeXBlPHR5cGVvZiBzdG9yZS5nZXRTdGF0ZT47XG5leHBvcnQgdHlwZSBBcHBEaXNwYXRjaCA9IHR5cGVvZiBzdG9yZS5kaXNwYXRjaDtcbiJdLCJuYW1lcyI6WyJjb25maWd1cmVTdG9yZSIsIkRhdGFTbGljZSIsInN0b3JlIiwicmVkdWNlciIsIlByb2ZpbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./redux_tool/store.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _redux_tool_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../redux_tool/store */ \"./redux_tool/store.tsx\");\n\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_redux__WEBPACK_IMPORTED_MODULE_2__.Provider, {\n        store: _redux_tool_store__WEBPACK_IMPORTED_MODULE_3__.store,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/ibenmain/Desktop/my-SpringShot/src/pages/_app.tsx\",\n            lineNumber: 8,\n            columnNumber: 9\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/ibenmain/Desktop/my-SpringShot/src/pages/_app.tsx\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQTZCO0FBRVM7QUFDUTtBQUMvQixTQUFTRSxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzVELHFCQUNFLDhEQUFDSixpREFBUUE7UUFBQ0MsT0FBT0Esb0RBQUtBO2tCQUNsQiw0RUFBQ0U7WUFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OztBQUdoQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwaW5zaG90Ly4vc3JjL3BhZ2VzL19hcHAudHN4P2Y5ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdAL3N0eWxlcy9nbG9iYWxzLmNzcydcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCdcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgIHtzdG9yZX0gIGZyb20gJy4uLy4uL3JlZHV4X3Rvb2wvc3RvcmUnXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9Qcm92aWRlcj5cbiAgKVxufVxuIl0sIm5hbWVzIjpbIlByb3ZpZGVyIiwic3RvcmUiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "@reduxjs/toolkit":
/*!***********************************!*\
  !*** external "@reduxjs/toolkit" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();