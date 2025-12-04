(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 37
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/carousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Carousel",
    ()=>Carousel,
    "CarouselContent",
    ()=>CarouselContent,
    "CarouselItem",
    ()=>CarouselItem,
    "CarouselNext",
    ()=>CarouselNext,
    "CarouselPrevious",
    ()=>CarouselPrevious
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/embla-carousel-react/esm/embla-carousel-react.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const CarouselContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
function useCarousel() {
    _s();
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }
    return context;
}
_s(useCarousel, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const Carousel = /*#__PURE__*/ _s1(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = _s1(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref)=>{
    _s1();
    const [carouselRef, api] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
    }, plugins);
    const [canScrollPrev, setCanScrollPrev] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [canScrollNext, setCanScrollNext] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const onSelect = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "Carousel.useCallback[onSelect]": (api)=>{
            if (!api) {
                return;
            }
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        }
    }["Carousel.useCallback[onSelect]"], []);
    const scrollPrev = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "Carousel.useCallback[scrollPrev]": ()=>{
            api?.scrollPrev();
        }
    }["Carousel.useCallback[scrollPrev]"], [
        api
    ]);
    const scrollNext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "Carousel.useCallback[scrollNext]": ()=>{
            api?.scrollNext();
        }
    }["Carousel.useCallback[scrollNext]"], [
        api
    ]);
    const handleKeyDown = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "Carousel.useCallback[handleKeyDown]": (event)=>{
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                scrollNext();
            }
        }
    }["Carousel.useCallback[handleKeyDown]"], [
        scrollPrev,
        scrollNext
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "Carousel.useEffect": ()=>{
            if (!api || !setApi) {
                return;
            }
            setApi(api);
        }
    }["Carousel.useEffect"], [
        api,
        setApi
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "Carousel.useEffect": ()=>{
            if (!api) {
                return;
            }
            onSelect(api);
            api.on("reInit", onSelect);
            api.on("select", onSelect);
            return ({
                "Carousel.useEffect": ()=>{
                    api?.off("select", onSelect);
                }
            })["Carousel.useEffect"];
        }
    }["Carousel.useEffect"], [
        api,
        onSelect
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselContext.Provider, {
        value: {
            carouselRef,
            api: api,
            opts,
            orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
            scrollPrev,
            scrollNext,
            canScrollPrev,
            canScrollNext
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            onKeyDownCapture: handleKeyDown,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/components/ui/carousel.tsx",
            lineNumber: 119,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/carousel.tsx",
        lineNumber: 107,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "72w3/pym1wz2ZcTGqySg56b8KiQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
})), "72w3/pym1wz2ZcTGqySg56b8KiQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c1 = Carousel;
Carousel.displayName = "Carousel";
const CarouselContent = /*#__PURE__*/ _s2(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = _s2(({ className, ...props }, ref)=>{
    _s2();
    const { carouselRef, orientation } = useCarousel();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: carouselRef,
        className: "overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/components/ui/carousel.tsx",
            lineNumber: 141,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/carousel.tsx",
        lineNumber: 140,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "YNqN7/p8l2NfYueiPechI4IqsYo=", false, function() {
    return [
        useCarousel
    ];
})), "YNqN7/p8l2NfYueiPechI4IqsYo=", false, function() {
    return [
        useCarousel
    ];
});
_c3 = CarouselContent;
CarouselContent.displayName = "CarouselContent";
const CarouselItem = /*#__PURE__*/ _s3(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = _s3(({ className, ...props }, ref)=>{
    _s3();
    const { orientation } = useCarousel();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        role: "group",
        "aria-roledescription": "slide",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/carousel.tsx",
        lineNumber: 157,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "bPPpMbUdjWnfcwMzP4altEp5ZJs=", false, function() {
    return [
        useCarousel
    ];
})), "bPPpMbUdjWnfcwMzP4altEp5ZJs=", false, function() {
    return [
        useCarousel
    ];
});
_c5 = CarouselItem;
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = /*#__PURE__*/ _s4(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = _s4(({ className, variant = "outline", size = "icon", ...props }, ref)=>{
    _s4();
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        ref: ref,
        variant: variant,
        size: size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/ui/carousel.tsx",
                lineNumber: 189,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: "Previous slide"
            }, void 0, false, {
                fileName: "[project]/components/ui/carousel.tsx",
                lineNumber: 190,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/carousel.tsx",
        lineNumber: 174,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "StVzzFT/dKvE6v0nHx014nh7DNA=", false, function() {
    return [
        useCarousel
    ];
})), "StVzzFT/dKvE6v0nHx014nh7DNA=", false, function() {
    return [
        useCarousel
    ];
});
_c7 = CarouselPrevious;
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = /*#__PURE__*/ _s5(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = _s5(({ className, variant = "outline", size = "icon", ...props }, ref)=>{
    _s5();
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        ref: ref,
        variant: variant,
        size: size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/ui/carousel.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: "Next slide"
            }, void 0, false, {
                fileName: "[project]/components/ui/carousel.tsx",
                lineNumber: 218,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/carousel.tsx",
        lineNumber: 202,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "VthXVrvg+0LPsG5FRGeAaBGswm4=", false, function() {
    return [
        useCarousel
    ];
})), "VthXVrvg+0LPsG5FRGeAaBGswm4=", false, function() {
    return [
        useCarousel
    ];
});
_c9 = CarouselNext;
CarouselNext.displayName = "CarouselNext";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Carousel$React.forwardRef");
__turbopack_context__.k.register(_c1, "Carousel");
__turbopack_context__.k.register(_c2, "CarouselContent$React.forwardRef");
__turbopack_context__.k.register(_c3, "CarouselContent");
__turbopack_context__.k.register(_c4, "CarouselItem$React.forwardRef");
__turbopack_context__.k.register(_c5, "CarouselItem");
__turbopack_context__.k.register(_c6, "CarouselPrevious$React.forwardRef");
__turbopack_context__.k.register(_c7, "CarouselPrevious");
__turbopack_context__.k.register(_c8, "CarouselNext$React.forwardRef");
__turbopack_context__.k.register(_c9, "CarouselNext");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useCarouselAutoPlay.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCarouselAutoPlay",
    ()=>useCarouselAutoPlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useCarouselAutoPlay(options = {}) {
    _s();
    const { autoPlayInterval = 4200, restoreDelay = 5000 } = options;
    const [api, setApi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isAutoPlay, setIsAutoPlay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // 监听幻灯片选择变化
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCarouselAutoPlay.useEffect": ()=>{
            if (!api) return;
            setCurrent(api.selectedScrollSnap());
            api.on("select", {
                "useCarouselAutoPlay.useEffect": ()=>{
                    setCurrent(api.selectedScrollSnap());
                }
            }["useCarouselAutoPlay.useEffect"]);
        }
    }["useCarouselAutoPlay.useEffect"], [
        api
    ]);
    // 自动播放
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCarouselAutoPlay.useEffect": ()=>{
            if (!api || !isAutoPlay) return;
            const interval = setInterval({
                "useCarouselAutoPlay.useEffect.interval": ()=>{
                    api.scrollNext();
                }
            }["useCarouselAutoPlay.useEffect.interval"], autoPlayInterval);
            return ({
                "useCarouselAutoPlay.useEffect": ()=>clearInterval(interval)
            })["useCarouselAutoPlay.useEffect"];
        }
    }["useCarouselAutoPlay.useEffect"], [
        api,
        isAutoPlay,
        autoPlayInterval
    ]);
    // 自动恢复播放
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCarouselAutoPlay.useEffect": ()=>{
            if (isAutoPlay || restoreDelay === 0) return;
            const restoreTimer = setTimeout({
                "useCarouselAutoPlay.useEffect.restoreTimer": ()=>{
                    setIsAutoPlay(true);
                }
            }["useCarouselAutoPlay.useEffect.restoreTimer"], restoreDelay);
            return ({
                "useCarouselAutoPlay.useEffect": ()=>clearTimeout(restoreTimer)
            })["useCarouselAutoPlay.useEffect"];
        }
    }["useCarouselAutoPlay.useEffect"], [
        isAutoPlay,
        restoreDelay
    ]);
    // 封装滚动方法，自动暂停自动播放
    const scrollPrev = ()=>{
        setIsAutoPlay(false);
        api?.scrollPrev();
    };
    const scrollNext = ()=>{
        setIsAutoPlay(false);
        api?.scrollNext();
    };
    const scrollTo = (index)=>{
        setIsAutoPlay(false);
        api?.scrollTo(index);
    };
    return {
        api,
        setApi,
        current,
        isAutoPlay,
        setIsAutoPlay,
        scrollPrev,
        scrollNext,
        scrollTo
    };
}
_s(useCarouselAutoPlay, "v+RUbxoq/aiO0yx/xOnRy+2T5mI=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PCBMotorSlider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PCBMotorSlider",
    ()=>PCBMotorSlider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/carousel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cpu.js [app-client] (ecmascript) <export default as Cpu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circuit$2d$board$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircuitBoard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circuit-board.js [app-client] (ecmascript) <export default as CircuitBoard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/image-path.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCarouselAutoPlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useCarouselAutoPlay.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const slides = [
    {
        title: "PCB定子轴向电机",
        subtitle: "革命性的PCB定子技术",
        highlights: [
            "节省绕线、灌封成本，提高整体集成度",
            "轴向磁场设计，优化磁路结构",
            "支持有铁芯与无铁芯两种方案",
            "大幅提升生产自动化水平"
        ],
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/pcb-motor-intro.png"),
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
        gradient: "from-cyan-500/15 via-blue-500/15 to-teal-500/15",
        isNewLayout: true,
        newLayoutImages: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/pcbdingzi1.png"),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/pcbdingzi2.png"),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/pcbdingzi3.png")
        ],
        newLayoutTitle: "PCB定子轴向磁通电机",
        newLayoutSubtitle: "无铁芯 PCB定子轴向磁通电机"
    },
    {
        title: "径向磁通 vs 轴向磁通",
        subtitle: "磁路设计的技术革新",
        highlights: [
            "轴向磁通电机采用扁平化设计，功率密度更高",
            "磁通方向沿轴线传递，磁路更短更高效",
            "PCB定子线圈工艺实现精确控制",
            "适合高转矩低速应用场景"
        ],
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/jingxiangzhouxiang.png"),
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
        gradient: "from-teal-500/15 via-cyan-500/15 to-blue-500/15",
        isComparisonLayout: true
    },
    {
        title: "PCB电机\n两种结构形式",
        subtitle: "高效能硅钢铁芯方案",
        highlights: [
            "比传统绕线定子节省更多铜用量",
            "减少磁滞和涡流损耗，提高电机效率",
            "无需绕线、灌封，成本最低",
            "集成传感器与电控，提高集成度并简化组装"
        ],
        image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/pcb-motor-two-structures.png"),
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cpu$3e$__["Cpu"],
        gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
        isSpecialLayout: true,
        images: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/PCBdingzi.png"),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/youtiexin.png"),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/wutiexin.png")
        ],
        textLabels: {
            mainTitle: "PCB定子轴向电机",
            leftTitle: "有铁芯",
            leftDesc: "硅钢或SMC材料铁芯",
            rightTitle: "无铁芯",
            rightDesc: "无需铁芯，重量/成本大幅度减少"
        }
    }
];
const PCBMotorSlider = ()=>{
    _s();
    const { api, setApi, current, scrollPrev, scrollNext, scrollTo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCarouselAutoPlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCarouselAutoPlay"])({
        autoPlayInterval: 4200,
        restoreDelay: 5000
    });
    const cardRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PCBMotorSlider.useEffect": ()=>{
            const updateHeights = {
                "PCBMotorSlider.useEffect.updateHeights": ()=>{
                    // 过滤掉null值，获取所有Card元素
                    const cards = cardRefs.current.filter(Boolean);
                    if (cards.length === 0) return;
                    // 重置高度，让内容自然决定高度
                    cards.forEach({
                        "PCBMotorSlider.useEffect.updateHeights": (card)=>{
                            card.style.height = 'auto';
                        }
                    }["PCBMotorSlider.useEffect.updateHeights"]);
                    // 等待浏览器重新计算布局
                    requestAnimationFrame({
                        "PCBMotorSlider.useEffect.updateHeights": ()=>{
                            // 计算最大高度
                            const maxHeight = Math.max(...cards.map({
                                "PCBMotorSlider.useEffect.updateHeights.maxHeight": (card)=>card.offsetHeight
                            }["PCBMotorSlider.useEffect.updateHeights.maxHeight"]));
                            // 统一设置高度
                            cards.forEach({
                                "PCBMotorSlider.useEffect.updateHeights": (card)=>{
                                    card.style.height = `${maxHeight}px`;
                                }
                            }["PCBMotorSlider.useEffect.updateHeights"]);
                        }
                    }["PCBMotorSlider.useEffect.updateHeights"]);
                }
            }["PCBMotorSlider.useEffect.updateHeights"];
            // 初始计算 - 延迟执行以确保所有卡片都已渲染
            const timer = setTimeout({
                "PCBMotorSlider.useEffect.timer": ()=>{
                    updateHeights();
                }
            }["PCBMotorSlider.useEffect.timer"], 100);
            // 监听窗口大小变化
            window.addEventListener('resize', updateHeights);
            // 监听carousel切换，重新计算高度
            const handleSelect = {
                "PCBMotorSlider.useEffect.handleSelect": ()=>{
                    setTimeout(updateHeights, 100);
                }
            }["PCBMotorSlider.useEffect.handleSelect"];
            if (api) {
                api.on('select', handleSelect);
            }
            return ({
                "PCBMotorSlider.useEffect": ()=>{
                    clearTimeout(timer);
                    window.removeEventListener('resize', updateHeights);
                    if (api) {
                        api.off('select', handleSelect);
                    }
                }
            })["PCBMotorSlider.useEffect"];
        }
    }["PCBMotorSlider.useEffect"], [
        api
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "pcb-motor-intro",
        className: "py-20 bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden section-fade-top-gradient section-fade-bottom-gradient",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-6 relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "flex items-center justify-center gap-3 mb-4",
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    transition: {
                                        duration: 0.6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circuit$2d$board$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircuitBoard$3e$__["CircuitBoard"], {
                                            className: "w-8 h-8 text-primary"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
                                            children: "PCB电机产品介绍"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                            lineNumber: 146,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                    className: "text-xl text-muted-foreground max-w-4xl mx-auto mb-4",
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    transition: {
                                        duration: 0.6,
                                        delay: 0.2
                                    },
                                    children: "突破传统，引领轴向磁通技术革新"
                                }, void 0, false, {
                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto",
                                    initial: {
                                        width: 0
                                    },
                                    whileInView: {
                                        width: 96
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    transition: {
                                        duration: 0.8,
                                        delay: 0.2
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                    lineNumber: 159,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/PCBMotorSlider.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Carousel"], {
                                setApi: setApi,
                                opts: {
                                    align: "start",
                                    loop: true
                                },
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CarouselContent"], {
                                        className: "h-full items-stretch",
                                        children: slides.map((slide, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CarouselItem"], {
                                                className: "h-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                    ref: (el)=>{
                                                        cardRefs.current[index] = el;
                                                    },
                                                    className: "h-full flex flex-col border-2 border-primary/20 bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8 backdrop-blur-sm overflow-hidden relative group hover:border-primary/35 transition-all duration-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent shimmer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                lineNumber: 188,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `${slide.highlights.length === 0 ? 'flex flex-col items-center justify-center p-8 md:p-12' : 'grid md:grid-cols-2 gap-8 p-8 md:p-12 items-stretch'} relative flex-1`,
                                                            children: slide.highlights.length === 0 ? // Top-bottom layout for comparison slide
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                        initial: {
                                                                            opacity: 0,
                                                                            y: -20
                                                                        },
                                                                        whileInView: {
                                                                            opacity: 1,
                                                                            y: 0
                                                                        },
                                                                        viewport: {
                                                                            once: true
                                                                        },
                                                                        transition: {
                                                                            duration: 0.6,
                                                                            delay: 0.2
                                                                        },
                                                                        className: "text-center mb-8",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "text-3xl md:text-4xl font-bold text-foreground",
                                                                            children: slide.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                            lineNumber: 202,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                        lineNumber: 195,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                        initial: {
                                                                            opacity: 0,
                                                                            scale: 0.9
                                                                        },
                                                                        whileInView: {
                                                                            opacity: 1,
                                                                            scale: 1
                                                                        },
                                                                        viewport: {
                                                                            once: true
                                                                        },
                                                                        transition: {
                                                                            duration: 0.6,
                                                                            delay: 0.3
                                                                        },
                                                                        className: "flex items-center justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "relative w-full max-w-3xl",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-3xl animate-pulse"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 216,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "relative rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-sm bg-background/20 p-4",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                        src: slide.image,
                                                                                        alt: slide.title,
                                                                                        className: "w-full h-auto object-contain",
                                                                                        loading: "lazy"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                        lineNumber: 220,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 219,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 229,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 230,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                            lineNumber: 214,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                        lineNumber: 207,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true) : // Original left-right layout
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                        initial: {
                                                                            opacity: 0,
                                                                            x: -30
                                                                        },
                                                                        whileInView: {
                                                                            opacity: 1,
                                                                            x: 0
                                                                        },
                                                                        viewport: {
                                                                            once: true
                                                                        },
                                                                        transition: {
                                                                            duration: 0.6,
                                                                            delay: 0.2
                                                                        },
                                                                        className: "flex flex-col justify-center space-y-6 ml-12",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "space-y-3",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                        className: "text-3xl md:text-4xl font-bold text-foreground leading-tight whitespace-pre-line",
                                                                                        children: slide.title
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                        lineNumber: 246,
                                                                                        columnNumber: 27
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-lg text-primary/90 font-semibold",
                                                                                        children: slide.subtitle
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                        lineNumber: 249,
                                                                                        columnNumber: 27
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                lineNumber: 245,
                                                                                columnNumber: 25
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "space-y-4",
                                                                                children: slide.highlights.map((highlight, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                        initial: {
                                                                                            opacity: 0,
                                                                                            x: -20
                                                                                        },
                                                                                        whileInView: {
                                                                                            opacity: 1,
                                                                                            x: 0
                                                                                        },
                                                                                        viewport: {
                                                                                            once: true
                                                                                        },
                                                                                        transition: {
                                                                                            duration: 0.4,
                                                                                            delay: 0.3 + idx * 0.1
                                                                                        },
                                                                                        className: "flex items-start gap-3 group/item",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "mt-1.5",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "w-2 h-2 rounded-full bg-primary relative",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "absolute inset-0 rounded-full bg-primary animate-ping opacity-75"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                        lineNumber: 267,
                                                                                                        columnNumber: 35
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                    lineNumber: 266,
                                                                                                    columnNumber: 33
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                lineNumber: 265,
                                                                                                columnNumber: 31
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                className: "text-foreground/90 leading-relaxed group-hover/item:text-foreground transition-colors",
                                                                                                children: highlight
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                lineNumber: 270,
                                                                                                columnNumber: 31
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, idx, true, {
                                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                        lineNumber: 257,
                                                                                        columnNumber: 29
                                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                lineNumber: 255,
                                                                                columnNumber: 25
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                        lineNumber: 238,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                        initial: {
                                                                            opacity: 0,
                                                                            scale: 0.9
                                                                        },
                                                                        whileInView: {
                                                                            opacity: 1,
                                                                            scale: 1
                                                                        },
                                                                        viewport: {
                                                                            once: true
                                                                        },
                                                                        transition: {
                                                                            duration: 0.6,
                                                                            delay: 0.3
                                                                        },
                                                                        className: "flex items-center justify-center",
                                                                        children: slide.isNewLayout && slide.newLayoutImages ? // New layout for "PCB定子轴向电机"
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "relative w-full max-w-2xl",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-3xl animate-pulse"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 290,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "relative rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-sm bg-background/20 p-6",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "mb-6",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                                    className: "text-2xl md:text-3xl font-bold text-foreground mb-4 text-left",
                                                                                                    children: slide.newLayoutTitle
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                    lineNumber: 297,
                                                                                                    columnNumber: 33
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "relative flex justify-center",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "relative inline-block",
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                                src: slide.newLayoutImages[0],
                                                                                                                alt: "PCB定子轴向磁通电机爆炸图",
                                                                                                                className: "w-full max-w-lg h-auto object-contain",
                                                                                                                loading: "lazy"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                                lineNumber: 304,
                                                                                                                columnNumber: 37
                                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                className: "absolute bottom-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-md font-medium shadow-lg",
                                                                                                                children: "实物爆炸图"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                                lineNumber: 311,
                                                                                                                columnNumber: 37
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                        lineNumber: 303,
                                                                                                        columnNumber: 35
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                    lineNumber: 302,
                                                                                                    columnNumber: 33
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                            lineNumber: 295,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "mb-6",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                className: "text-center text-lg md:text-xl font-semibold text-accent",
                                                                                                children: slide.newLayoutSubtitle
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                lineNumber: 320,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                            lineNumber: 319,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "grid grid-cols-2 gap-6",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "flex flex-col items-center text-center space-y-3",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                            className: "w-full flex justify-center",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                                src: slide.newLayoutImages[1],
                                                                                                                alt: "PCB定子实物",
                                                                                                                className: "w-full max-w-[200px] h-auto object-contain",
                                                                                                                loading: "lazy"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                                lineNumber: 330,
                                                                                                                columnNumber: 37
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 329,
                                                                                                            columnNumber: 35
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                            className: "text-sm md:text-base font-medium text-foreground",
                                                                                                            children: "PCB定子实物"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 337,
                                                                                                            columnNumber: 35
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                    lineNumber: 328,
                                                                                                    columnNumber: 33
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "flex flex-col items-center text-center space-y-3",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                            className: "w-full flex justify-center",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                                src: slide.newLayoutImages[2],
                                                                                                                alt: "PCB定子截面",
                                                                                                                className: "w-full max-w-[200px] h-auto object-contain",
                                                                                                                loading: "lazy"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                                lineNumber: 345,
                                                                                                                columnNumber: 37
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 344,
                                                                                                            columnNumber: 35
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                            className: "text-sm md:text-base font-medium text-foreground",
                                                                                                            children: "PCB定子截面"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 352,
                                                                                                            columnNumber: 35
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                    lineNumber: 343,
                                                                                                    columnNumber: 33
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                            lineNumber: 326,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 293,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 360,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 361,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                            lineNumber: 288,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)) : slide.isSpecialLayout && slide.images && slide.textLabels ? // Special layout for "PCB电机两种结构形式"
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "relative w-full max-w-2xl",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-3xl animate-pulse"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 367,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "relative rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-sm bg-background/20 p-4",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "bg-[#1e3a5f] py-3 px-6 rounded-lg mb-4",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                                className: "text-white text-xl font-bold text-center",
                                                                                                children: slide.textLabels.mainTitle
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                lineNumber: 373,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                            lineNumber: 372,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex justify-center mb-4",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                src: slide.images[0],
                                                                                                alt: "PCB定子轴向电机结构",
                                                                                                className: "w-full max-w-lg h-auto object-contain",
                                                                                                loading: "lazy"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                lineNumber: 380,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                            lineNumber: 379,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "grid grid-cols-2 gap-4",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "flex flex-col items-center text-center space-y-2",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                                            className: "text-lg font-bold text-foreground",
                                                                                                            children: slide.textLabels.leftTitle
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 392,
                                                                                                            columnNumber: 35
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                            className: "w-full flex justify-center",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                                src: slide.images[1],
                                                                                                                alt: "有铁芯结构",
                                                                                                                className: "w-full max-w-[200px] h-auto object-contain",
                                                                                                                loading: "lazy"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                                lineNumber: 396,
                                                                                                                columnNumber: 37
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 395,
                                                                                                            columnNumber: 35
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                            className: "text-sm text-muted-foreground",
                                                                                                            children: slide.textLabels.leftDesc
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 403,
                                                                                                            columnNumber: 35
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                    lineNumber: 391,
                                                                                                    columnNumber: 33
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "flex flex-col items-center text-center space-y-2",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                                            className: "text-lg font-bold text-foreground",
                                                                                                            children: slide.textLabels.rightTitle
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 410,
                                                                                                            columnNumber: 35
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                            className: "w-full flex justify-center",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                                src: slide.images[2],
                                                                                                                alt: "无铁芯结构",
                                                                                                                className: "w-full max-w-[160px] h-auto object-contain",
                                                                                                                loading: "lazy"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                                lineNumber: 414,
                                                                                                                columnNumber: 37
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 413,
                                                                                                            columnNumber: 35
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                            className: "text-sm text-muted-foreground",
                                                                                                            children: slide.textLabels.rightDesc
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 421,
                                                                                                            columnNumber: 35
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                    lineNumber: 409,
                                                                                                    columnNumber: 33
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                            lineNumber: 389,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 370,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 429,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 430,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                            lineNumber: 365,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)) : slide.isComparisonLayout ? // Comparison layout for "径向磁通 vs 轴向磁通"
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `relative w-full max-w-xl`,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-3xl animate-pulse"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 436,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "relative rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-sm bg-background/20 pt-8 pb-4 px-4",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                            src: slide.image,
                                                                                            alt: slide.title,
                                                                                            className: "w-full h-auto object-contain"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                            lineNumber: 440,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "absolute inset-0 pointer-events-none",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "absolute top-[2%] left-[12%] md:top-[1.5%] md:left-[10%]",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "bg-primary rounded-lg py-1.5 px-3 md:py-2 md:px-4 shadow-lg",
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                            className: "text-xs md:text-sm font-medium text-primary-foreground whitespace-nowrap",
                                                                                                            children: "径向磁通电机"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 452,
                                                                                                            columnNumber: 37
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                        lineNumber: 451,
                                                                                                        columnNumber: 35
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                    lineNumber: 450,
                                                                                                    columnNumber: 33
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "absolute bottom-[6%] left-[25%] -translate-x-1/2 md:bottom-[5%] md:left-[25%] md:-translate-x-1/2",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "text-xs md:text-sm font-medium text-accent text-center whitespace-nowrap",
                                                                                                        children: "线圈定子实物"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                        lineNumber: 458,
                                                                                                        columnNumber: 35
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                    lineNumber: 457,
                                                                                                    columnNumber: 33
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "absolute top-[2%] right-[12%] md:top-[1.5%] md:right-[10%]",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "bg-primary rounded-lg py-1.5 px-3 md:py-2 md:px-4 shadow-lg",
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                            className: "text-xs md:text-sm font-medium text-primary-foreground whitespace-nowrap",
                                                                                                            children: "轴向磁通电机"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                            lineNumber: 465,
                                                                                                            columnNumber: 37
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                        lineNumber: 464,
                                                                                                        columnNumber: 35
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                    lineNumber: 463,
                                                                                                    columnNumber: 33
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "absolute bottom-[6%] right-[25%] translate-x-1/2 md:bottom-[5%] md:right-[25%] md:translate-x-1/2",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "text-xs md:text-sm font-medium text-accent text-center whitespace-nowrap",
                                                                                                        children: "线圈定子实物"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                        lineNumber: 471,
                                                                                                        columnNumber: 35
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                                    lineNumber: 470,
                                                                                                    columnNumber: 33
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                            lineNumber: 447,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 439,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 477,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 478,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                            lineNumber: 434,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)) : // Default image layout
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `relative w-full max-w-xl`,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-3xl animate-pulse"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 484,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "relative rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-sm bg-background/20 p-4",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                        src: slide.image,
                                                                                        alt: slide.title,
                                                                                        className: "w-full h-auto object-contain"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                        lineNumber: 488,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 487,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 496,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                                    lineNumber: 497,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                            lineNumber: 482,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                                                        lineNumber: 279,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, index, false, {
                                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                                lineNumber: 179,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: scrollPrev,
                                        className: "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0",
                                        variant: "ghost",
                                        "aria-label": "上一张幻灯片",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            strokeWidth: 3,
                                            className: "h-12 w-12 transition-colors text-[#2dc2b3]"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                            lineNumber: 516,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                        lineNumber: 510,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: scrollNext,
                                        className: "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0",
                                        variant: "ghost",
                                        "aria-label": "下一张幻灯片",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            strokeWidth: 3,
                                            className: "h-12 w-12 transition-colors text-[#2dc2b3]"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PCBMotorSlider.tsx",
                                            lineNumber: 524,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/PCBMotorSlider.tsx",
                                        lineNumber: 518,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PCBMotorSlider.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/PCBMotorSlider.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center gap-2 mt-6",
                            children: slides.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>scrollTo(index),
                                    className: `h-2 rounded-full transition-all duration-300 ${current === index ? "bg-primary w-10 shadow-lg shadow-primary/50" : "bg-primary/30 w-2 hover:bg-primary/50"}`,
                                    "aria-label": `跳转到第 ${index + 1} 张幻灯片`,
                                    "aria-current": current === index ? "true" : undefined
                                }, index, false, {
                                    fileName: "[project]/components/PCBMotorSlider.tsx",
                                    lineNumber: 532,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/PCBMotorSlider.tsx",
                            lineNumber: 530,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/PCBMotorSlider.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/PCBMotorSlider.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer {
          animation: shimmer 3s infinite;
        }
      `
            }, void 0, false, {
                fileName: "[project]/components/PCBMotorSlider.tsx",
                lineNumber: 548,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/PCBMotorSlider.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PCBMotorSlider, "ok/5gKoIlJgGnOkhF+F9wp5gOqM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCarouselAutoPlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCarouselAutoPlay"]
    ];
});
_c = PCBMotorSlider;
var _c;
__turbopack_context__.k.register(_c, "PCBMotorSlider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PCBMotorAdvantages.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PCBMotorAdvantages",
    ()=>PCBMotorAdvantages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/image-path.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/carousel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$feather$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Feather$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/feather.js [app-client] (ecmascript) <export default as Feather>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/droplet.js [app-client] (ecmascript) <export default as Droplet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCarouselAutoPlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useCarouselAutoPlay.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const advantages = [
    {
        title: "轻量化",
        description: "对比传统径向电机，PCB电机在同等功率下实现显著的尺寸和重量优势",
        highlights: [
            "轴向长度减少 60%",
            "重量减轻 60-80%",
            "同等体积下功率提升约 30%",
            "轴向尺寸：PCB电机 87.5mm vs 传统电机 200mm",
            "重量对比：PCB电机 11kg vs 传统电机 20kg"
        ],
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$feather$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Feather$3e$__["Feather"],
        gradient: "from-cyan-500/20 via-primary/10 to-accent/20",
        imagePlaceholder: "占位图：轻量化对比图 - 显示传统径向电机与PCB电机的尺寸和重量对比"
    },
    {
        title: "功率密度高",
        description: "PCB定子采用创新设计，铜满率远超传统圆线和扁线方案",
        highlights: [
            "PCB定子铜满率可达 35%-60%",
            "圆线绕组铜满率：30-40%",
            "扁线绕组铜满率：60%",
            "设计灵活 + 高可制造性 + 工艺成熟",
            "多种散热工艺，提升整体散热能力，在等热条件下功率密度提升"
        ],
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
        gradient: "from-blue-500/20 via-primary/10 to-cyan-500/20",
        imagePlaceholder: "占位图：铜满率对比图 - 显示圆线/扁线/PCB定子横截面对比及铜满率数据"
    },
    {
        title: "防水性好",
        description: "PCB定子独特的结构设计，支持浸液冷却和微流道散热技术",
        highlights: [
            "PCB定子可浸液设计",
            "可加入微流道增强散热能力",
            "根本解决IP68实现方式",
            "增强散热能力的同时提升防护等级",
            "适用于恶劣环境和高可靠性应用"
        ],
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplet$3e$__["Droplet"],
        gradient: "from-teal-500/20 via-primary/10 to-blue-500/20",
        imagePlaceholder: "占位图：防水设计示意图 - 显示PCB定子浸液设计和微流道结构"
    },
    {
        title: "加工成本低",
        description: "相比传统轴向通磁电机，PCB电机方案具有显著的制造成本优势",
        highlights: [
            "自动化定子绕线，如Yasa几亿美金自动定子线",
            "传统铁芯压铸工艺复杂，PCB方案更简单",
            "规模化生产成本优势明显",
            "减少人工成本，提高生产效率",
            "标准化PCB制造工艺，质量稳定可靠"
        ],
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"],
        gradient: "from-emerald-500/20 via-primary/10 to-teal-500/20",
        imagePlaceholder: "占位图：自动化生产图 - 显示Yasa自动化生产线和传统轴向电机制造对比"
    }
];
const PCBMotorAdvantages = ()=>{
    _s();
    const { api, setApi, current, scrollPrev, scrollNext, scrollTo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCarouselAutoPlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCarouselAutoPlay"])({
        autoPlayInterval: 4200,
        restoreDelay: 5000
    });
    const cardRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PCBMotorAdvantages.useEffect": ()=>{
            const updateHeights = {
                "PCBMotorAdvantages.useEffect.updateHeights": ()=>{
                    // 过滤掉null值，获取所有Card元素
                    const cards = cardRefs.current.filter(Boolean);
                    if (cards.length === 0) return;
                    // 重置高度，让内容自然决定高度
                    cards.forEach({
                        "PCBMotorAdvantages.useEffect.updateHeights": (card)=>{
                            card.style.height = 'auto';
                        }
                    }["PCBMotorAdvantages.useEffect.updateHeights"]);
                    // 等待浏览器重新计算布局
                    requestAnimationFrame({
                        "PCBMotorAdvantages.useEffect.updateHeights": ()=>{
                            // 计算最大高度
                            const maxHeight = Math.max(...cards.map({
                                "PCBMotorAdvantages.useEffect.updateHeights.maxHeight": (card)=>card.offsetHeight
                            }["PCBMotorAdvantages.useEffect.updateHeights.maxHeight"]));
                            // 统一设置高度
                            cards.forEach({
                                "PCBMotorAdvantages.useEffect.updateHeights": (card)=>{
                                    card.style.height = `${maxHeight}px`;
                                }
                            }["PCBMotorAdvantages.useEffect.updateHeights"]);
                        }
                    }["PCBMotorAdvantages.useEffect.updateHeights"]);
                }
            }["PCBMotorAdvantages.useEffect.updateHeights"];
            // 初始计算 - 延迟执行以确保所有卡片都已渲染
            const timer = setTimeout({
                "PCBMotorAdvantages.useEffect.timer": ()=>{
                    updateHeights();
                }
            }["PCBMotorAdvantages.useEffect.timer"], 100);
            // 监听窗口大小变化
            window.addEventListener('resize', updateHeights);
            // 监听carousel切换，重新计算高度
            const handleSelect = {
                "PCBMotorAdvantages.useEffect.handleSelect": ()=>{
                    setTimeout(updateHeights, 100);
                }
            }["PCBMotorAdvantages.useEffect.handleSelect"];
            if (api) {
                api.on('select', handleSelect);
            }
            return ({
                "PCBMotorAdvantages.useEffect": ()=>{
                    clearTimeout(timer);
                    window.removeEventListener('resize', updateHeights);
                    if (api) {
                        api.off('select', handleSelect);
                    }
                }
            })["PCBMotorAdvantages.useEffect"];
        }
    }["PCBMotorAdvantages.useEffect"], [
        api
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "pcb-motor-advantages",
        className: "py-20 bg-gradient-to-br from-secondary/5 via-primary/5 to-accent/10 relative overflow-hidden section-fade-top-gradient section-fade-bottom-gradient",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0",
                    style: {
                        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }
                }, void 0, false, {
                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-6 relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "flex items-center justify-center gap-3 mb-4",
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    transition: {
                                        duration: 0.6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                            className: "w-8 h-8 text-primary"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
                                            children: "PCB电机优势"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                            lineNumber: 158,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                    className: "text-xl text-muted-foreground max-w-4xl mx-auto mb-4",
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    transition: {
                                        duration: 0.6,
                                        delay: 0.2
                                    },
                                    children: "突破传统电机限制，引领电机技术革新"
                                }, void 0, false, {
                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto",
                                    initial: {
                                        width: 0
                                    },
                                    whileInView: {
                                        width: 96
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    transition: {
                                        duration: 0.8,
                                        delay: 0.2
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative max-w-6xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Carousel"], {
                                    setApi: setApi,
                                    opts: {
                                        align: "start",
                                        loop: true
                                    },
                                    className: "w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CarouselContent"], {
                                            className: "h-full items-stretch",
                                            children: advantages.map((advantage, index)=>{
                                                const Icon = advantage.icon;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CarouselItem"], {
                                                    className: "h-full",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0,
                                                            scale: 0.95
                                                        },
                                                        whileInView: {
                                                            opacity: 1,
                                                            scale: 1
                                                        },
                                                        viewport: {
                                                            once: true
                                                        },
                                                        transition: {
                                                            duration: 0.5
                                                        },
                                                        className: "h-full",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                            ref: (el)=>{
                                                                cardRefs.current[index] = el;
                                                            },
                                                            className: `h-full flex flex-col border-2 border-primary/20 bg-gradient-to-br ${advantage.gradient} backdrop-blur-sm overflow-hidden relative group hover:border-primary/40 transition-all duration-500`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent shimmer"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                        lineNumber: 210,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                    lineNumber: 209,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "grid md:grid-cols-2 gap-8 p-8 md:p-12 flex-1 items-center",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                            initial: {
                                                                                opacity: 0,
                                                                                x: -20
                                                                            },
                                                                            whileInView: {
                                                                                opacity: 1,
                                                                                x: 0
                                                                            },
                                                                            viewport: {
                                                                                once: true
                                                                            },
                                                                            transition: {
                                                                                duration: 0.6,
                                                                                delay: 0.2
                                                                            },
                                                                            className: "flex flex-col justify-center space-y-6",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-4",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                                                className: "w-8 h-8 text-primary-foreground"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                lineNumber: 225,
                                                                                                columnNumber: 35
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                            lineNumber: 224,
                                                                                            columnNumber: 33
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                            className: "text-3xl md:text-4xl font-bold text-foreground",
                                                                                            children: advantage.title
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                            lineNumber: 227,
                                                                                            columnNumber: 33
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                    lineNumber: 223,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-lg text-muted-foreground leading-relaxed",
                                                                                    children: advantage.description
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                    lineNumber: 233,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "space-y-3",
                                                                                    children: advantage.highlights.map((highlight, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                            initial: {
                                                                                                opacity: 0,
                                                                                                x: -10
                                                                                            },
                                                                                            whileInView: {
                                                                                                opacity: 1,
                                                                                                x: 0
                                                                                            },
                                                                                            viewport: {
                                                                                                once: true
                                                                                            },
                                                                                            transition: {
                                                                                                duration: 0.4,
                                                                                                delay: 0.3 + idx * 0.1
                                                                                            },
                                                                                            className: "flex items-start gap-3 group/item",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "w-1.5 h-1.5 rounded-full bg-primary mt-2 group-hover/item:scale-150 transition-transform"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 248,
                                                                                                    columnNumber: 37
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-foreground/90 leading-relaxed flex-1",
                                                                                                    children: highlight
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 249,
                                                                                                    columnNumber: 37
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            ]
                                                                                        }, idx, true, {
                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                            lineNumber: 240,
                                                                                            columnNumber: 35
                                                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                    lineNumber: 238,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                            lineNumber: 215,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                            initial: {
                                                                                opacity: 0,
                                                                                x: 20
                                                                            },
                                                                            whileInView: {
                                                                                opacity: 1,
                                                                                x: 0
                                                                            },
                                                                            viewport: {
                                                                                once: true
                                                                            },
                                                                            transition: {
                                                                                duration: 0.6,
                                                                                delay: 0.4
                                                                            },
                                                                            className: "flex items-center justify-center",
                                                                            children: index === 1 ? /* 功率密度高 - 特殊布局 */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "relative w-full max-w-md flex flex-col items-center space-y-6",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "relative w-full",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "relative w-full rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm overflow-hidden",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/gonglvmidu.png"),
                                                                                                alt: "功率密度对比图",
                                                                                                className: "w-full h-auto object-contain",
                                                                                                loading: "lazy"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                lineNumber: 271,
                                                                                                columnNumber: 39
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                            lineNumber: 270,
                                                                                            columnNumber: 37
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                        lineNumber: 269,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex justify-around w-full gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                initial: {
                                                                                                    opacity: 0,
                                                                                                    y: 10
                                                                                                },
                                                                                                whileInView: {
                                                                                                    opacity: 1,
                                                                                                    y: 0
                                                                                                },
                                                                                                viewport: {
                                                                                                    once: true
                                                                                                },
                                                                                                transition: {
                                                                                                    duration: 0.4,
                                                                                                    delay: 0.5
                                                                                                },
                                                                                                className: "text-center flex-1",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                    className: "text-sm md:text-base font-medium text-foreground",
                                                                                                    children: "圆线横截"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 289,
                                                                                                    columnNumber: 39
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                lineNumber: 282,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                initial: {
                                                                                                    opacity: 0,
                                                                                                    y: 10
                                                                                                },
                                                                                                whileInView: {
                                                                                                    opacity: 1,
                                                                                                    y: 0
                                                                                                },
                                                                                                viewport: {
                                                                                                    once: true
                                                                                                },
                                                                                                transition: {
                                                                                                    duration: 0.4,
                                                                                                    delay: 0.6
                                                                                                },
                                                                                                className: "text-center flex-1",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                    className: "text-sm md:text-base font-medium text-foreground",
                                                                                                    children: "扁线横截"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 298,
                                                                                                    columnNumber: 39
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                lineNumber: 291,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                initial: {
                                                                                                    opacity: 0,
                                                                                                    y: 10
                                                                                                },
                                                                                                whileInView: {
                                                                                                    opacity: 1,
                                                                                                    y: 0
                                                                                                },
                                                                                                viewport: {
                                                                                                    once: true
                                                                                                },
                                                                                                transition: {
                                                                                                    duration: 0.4,
                                                                                                    delay: 0.7
                                                                                                },
                                                                                                className: "text-center flex-1",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                    className: "text-sm md:text-base font-medium text-foreground",
                                                                                                    children: "PCB定子槽横截面"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 307,
                                                                                                    columnNumber: 39
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                lineNumber: 300,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                        lineNumber: 281,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "relative flex items-center justify-center gap-4 md:gap-6 lg:gap-8 w-full py-6 group/copper-rate",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                                className: "absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300 group-hover/copper-rate:opacity-100",
                                                                                                style: {
                                                                                                    height: 'calc(100% + 60px)',
                                                                                                    top: '-30px'
                                                                                                },
                                                                                                viewBox: "0 0 100 100",
                                                                                                preserveAspectRatio: "none",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                                                                id: "lineGradientLeft",
                                                                                                                x1: "0%",
                                                                                                                y1: "0%",
                                                                                                                x2: "100%",
                                                                                                                y2: "0%",
                                                                                                                children: [
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                                        offset: "0%",
                                                                                                                        stopColor: "hsl(var(--accent))",
                                                                                                                        stopOpacity: "0.3"
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                        lineNumber: 323,
                                                                                                                        columnNumber: 43
                                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                                        offset: "50%",
                                                                                                                        stopColor: "hsl(var(--accent))",
                                                                                                                        stopOpacity: "0.6"
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                        lineNumber: 324,
                                                                                                                        columnNumber: 43
                                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                                        offset: "100%",
                                                                                                                        stopColor: "hsl(var(--accent))",
                                                                                                                        stopOpacity: "0.8"
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                        lineNumber: 325,
                                                                                                                        columnNumber: 43
                                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                                ]
                                                                                                            }, void 0, true, {
                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                lineNumber: 322,
                                                                                                                columnNumber: 41
                                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                                                                id: "lineGradientRight",
                                                                                                                x1: "100%",
                                                                                                                y1: "0%",
                                                                                                                x2: "0%",
                                                                                                                y2: "0%",
                                                                                                                children: [
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                                        offset: "0%",
                                                                                                                        stopColor: "hsl(var(--accent))",
                                                                                                                        stopOpacity: "0.3"
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                        lineNumber: 328,
                                                                                                                        columnNumber: 43
                                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                                        offset: "50%",
                                                                                                                        stopColor: "hsl(var(--accent))",
                                                                                                                        stopOpacity: "0.6"
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                        lineNumber: 329,
                                                                                                                        columnNumber: 43
                                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                                        offset: "100%",
                                                                                                                        stopColor: "hsl(var(--accent))",
                                                                                                                        stopOpacity: "0.8"
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                        lineNumber: 330,
                                                                                                                        columnNumber: 43
                                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                                ]
                                                                                                            }, void 0, true, {
                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                lineNumber: 327,
                                                                                                                columnNumber: 41
                                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                                                                                id: "lineGlow",
                                                                                                                children: [
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                                                                        stdDeviation: "1",
                                                                                                                        result: "coloredBlur"
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                        lineNumber: 334,
                                                                                                                        columnNumber: 43
                                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                                                                                        children: [
                                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                                                                                in: "coloredBlur"
                                                                                                                            }, void 0, false, {
                                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                                lineNumber: 336,
                                                                                                                                columnNumber: 45
                                                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                                                                                in: "SourceGraphic"
                                                                                                                            }, void 0, false, {
                                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                                lineNumber: 337,
                                                                                                                                columnNumber: 45
                                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                                        ]
                                                                                                                    }, void 0, true, {
                                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                        lineNumber: 335,
                                                                                                                        columnNumber: 43
                                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                                ]
                                                                                                            }, void 0, true, {
                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                lineNumber: 333,
                                                                                                                columnNumber: 41
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                        lineNumber: 320,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                        d: "M 42 45 Q 35 35, 12 25",
                                                                                                        stroke: "url(#lineGradientLeft)",
                                                                                                        strokeWidth: "1.5",
                                                                                                        fill: "none",
                                                                                                        strokeOpacity: "0.6",
                                                                                                        strokeLinecap: "round",
                                                                                                        filter: "url(#lineGlow)",
                                                                                                        className: "transition-all duration-300 group-hover/copper-rate:stroke-opacity-100"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                        lineNumber: 343,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                        d: "M 42 55 Q 35 65, 12 75",
                                                                                                        stroke: "url(#lineGradientLeft)",
                                                                                                        strokeWidth: "1.5",
                                                                                                        fill: "none",
                                                                                                        strokeOpacity: "0.6",
                                                                                                        strokeLinecap: "round",
                                                                                                        filter: "url(#lineGlow)",
                                                                                                        className: "transition-all duration-300 group-hover/copper-rate:stroke-opacity-100"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                        lineNumber: 354,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                        d: "M 58 45 Q 65 35, 88 25",
                                                                                                        stroke: "url(#lineGradientRight)",
                                                                                                        strokeWidth: "1.5",
                                                                                                        fill: "none",
                                                                                                        strokeOpacity: "0.6",
                                                                                                        strokeLinecap: "round",
                                                                                                        filter: "url(#lineGlow)",
                                                                                                        className: "transition-all duration-300 group-hover/copper-rate:stroke-opacity-100"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                        lineNumber: 365,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                        d: "M 58 55 Q 65 65, 88 75",
                                                                                                        stroke: "url(#lineGradientRight)",
                                                                                                        strokeWidth: "1.5",
                                                                                                        fill: "none",
                                                                                                        strokeOpacity: "0.6",
                                                                                                        strokeLinecap: "round",
                                                                                                        filter: "url(#lineGlow)",
                                                                                                        className: "transition-all duration-300 group-hover/copper-rate:stroke-opacity-100"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                        lineNumber: 376,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                lineNumber: 314,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                initial: {
                                                                                                    opacity: 0,
                                                                                                    x: -20
                                                                                                },
                                                                                                whileInView: {
                                                                                                    opacity: 1,
                                                                                                    x: 0
                                                                                                },
                                                                                                viewport: {
                                                                                                    once: true
                                                                                                },
                                                                                                transition: {
                                                                                                    duration: 0.4,
                                                                                                    delay: 0.8
                                                                                                },
                                                                                                className: "text-center relative z-10 group/item-left",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "text-sm md:text-base font-medium text-foreground mb-1 group-hover/item-left:text-primary transition-colors",
                                                                                                        children: "圆线"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                        lineNumber: 396,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover/item-left:scale-105 transition-transform duration-300",
                                                                                                        children: "30-40%"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                        lineNumber: 397,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                lineNumber: 389,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                initial: {
                                                                                                    opacity: 0,
                                                                                                    scale: 0.9
                                                                                                },
                                                                                                whileInView: {
                                                                                                    opacity: 1,
                                                                                                    scale: 1
                                                                                                },
                                                                                                viewport: {
                                                                                                    once: true
                                                                                                },
                                                                                                transition: {
                                                                                                    duration: 0.4,
                                                                                                    delay: 0.9
                                                                                                },
                                                                                                className: "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 relative z-10 transition-all duration-300 hover:scale-105",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                    className: "text-sm md:text-base lg:text-lg font-bold text-primary-foreground text-center",
                                                                                                    children: "铜满率"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 408,
                                                                                                    columnNumber: 39
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                lineNumber: 401,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                initial: {
                                                                                                    opacity: 0,
                                                                                                    x: 20
                                                                                                },
                                                                                                whileInView: {
                                                                                                    opacity: 1,
                                                                                                    x: 0
                                                                                                },
                                                                                                viewport: {
                                                                                                    once: true
                                                                                                },
                                                                                                transition: {
                                                                                                    duration: 0.4,
                                                                                                    delay: 1.0
                                                                                                },
                                                                                                className: "text-center relative z-10 group/item-right",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "text-sm md:text-base font-medium text-foreground mb-1 group-hover/item-right:text-primary transition-colors",
                                                                                                        children: "扁线"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                        lineNumber: 419,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                        className: "text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover/item-right:scale-105 transition-transform duration-300",
                                                                                                        children: "60%"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                        lineNumber: 420,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                lineNumber: 412,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                        lineNumber: 312,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                lineNumber: 267,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "relative w-full aspect-square max-w-md",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl group-hover:scale-110 transition-transform duration-700"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                        lineNumber: 427,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "relative w-full h-full rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm flex items-center justify-center p-8 group-hover:border-primary/50 transition-all duration-500 group-hover:scale-105 overflow-hidden",
                                                                                        children: index === 0 ? /* 轻量化 - 两个图片左右布局 */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "relative w-full max-w-md flex flex-row items-stretch gap-4 h-full",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "relative flex-1 flex flex-col items-center justify-between",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                            className: "relative w-full flex-1 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm overflow-hidden flex items-center justify-center min-h-0 p-4",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/qinglianghua1.png"),
                                                                                                                alt: "径向电机",
                                                                                                                className: "w-full h-full object-contain",
                                                                                                                loading: "lazy"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                lineNumber: 438,
                                                                                                                columnNumber: 45
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                            lineNumber: 437,
                                                                                                            columnNumber: 43
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                            initial: {
                                                                                                                opacity: 0,
                                                                                                                y: 10
                                                                                                            },
                                                                                                            whileInView: {
                                                                                                                opacity: 1,
                                                                                                                y: 0
                                                                                                            },
                                                                                                            viewport: {
                                                                                                                once: true
                                                                                                            },
                                                                                                            transition: {
                                                                                                                duration: 0.4,
                                                                                                                delay: 0.5
                                                                                                            },
                                                                                                            className: "w-full mt-3",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                className: "bg-accent rounded-lg py-2 px-4",
                                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                                    className: "text-xs md:text-sm font-medium text-accent-foreground text-center",
                                                                                                                    children: "径向电机"
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                    lineNumber: 455,
                                                                                                                    columnNumber: 47
                                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                lineNumber: 454,
                                                                                                                columnNumber: 45
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                            lineNumber: 447,
                                                                                                            columnNumber: 43
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                            initial: {
                                                                                                                opacity: 0,
                                                                                                                y: 10
                                                                                                            },
                                                                                                            whileInView: {
                                                                                                                opacity: 1,
                                                                                                                y: 0
                                                                                                            },
                                                                                                            viewport: {
                                                                                                                once: true
                                                                                                            },
                                                                                                            transition: {
                                                                                                                duration: 0.4,
                                                                                                                delay: 0.6
                                                                                                            },
                                                                                                            className: "w-full mt-3 space-y-2",
                                                                                                            children: [
                                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                    className: "flex items-center justify-between border-b border-border/50 pb-1",
                                                                                                                    children: [
                                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                            className: "text-xs md:text-sm text-muted-foreground",
                                                                                                                            children: "轴向尺寸"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                            lineNumber: 469,
                                                                                                                            columnNumber: 47
                                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                            className: "text-xs md:text-sm font-medium text-foreground",
                                                                                                                            children: "200mm"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                            lineNumber: 470,
                                                                                                                            columnNumber: 47
                                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                                    ]
                                                                                                                }, void 0, true, {
                                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                    lineNumber: 468,
                                                                                                                    columnNumber: 45
                                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                    className: "flex items-center justify-between border-b border-border/50 pb-1",
                                                                                                                    children: [
                                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                            className: "text-xs md:text-sm text-muted-foreground",
                                                                                                                            children: "重量"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                            lineNumber: 474,
                                                                                                                            columnNumber: 47
                                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                            className: "text-xs md:text-sm font-medium text-foreground",
                                                                                                                            children: "20kg"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                            lineNumber: 475,
                                                                                                                            columnNumber: 47
                                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                                    ]
                                                                                                                }, void 0, true, {
                                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                    lineNumber: 473,
                                                                                                                    columnNumber: 45
                                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                                            ]
                                                                                                        }, void 0, true, {
                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                            lineNumber: 460,
                                                                                                            columnNumber: 43
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 435,
                                                                                                    columnNumber: 41
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "relative flex-1 flex flex-col items-center justify-between",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                            className: "relative w-full flex-1 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm overflow-hidden flex items-center justify-center min-h-0 p-4",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/qinglianghua2.png"),
                                                                                                                alt: "PCB电机",
                                                                                                                className: "w-full h-full object-contain",
                                                                                                                loading: "lazy"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                lineNumber: 484,
                                                                                                                columnNumber: 45
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                            lineNumber: 483,
                                                                                                            columnNumber: 43
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                            initial: {
                                                                                                                opacity: 0,
                                                                                                                y: 10
                                                                                                            },
                                                                                                            whileInView: {
                                                                                                                opacity: 1,
                                                                                                                y: 0
                                                                                                            },
                                                                                                            viewport: {
                                                                                                                once: true
                                                                                                            },
                                                                                                            transition: {
                                                                                                                duration: 0.4,
                                                                                                                delay: 0.7
                                                                                                            },
                                                                                                            className: "w-full mt-3",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                className: "bg-accent rounded-lg py-2 px-4",
                                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                                    className: "text-xs md:text-sm font-medium text-accent-foreground text-center",
                                                                                                                    children: "PCB电机"
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                    lineNumber: 501,
                                                                                                                    columnNumber: 47
                                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                lineNumber: 500,
                                                                                                                columnNumber: 45
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                            lineNumber: 493,
                                                                                                            columnNumber: 43
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                            initial: {
                                                                                                                opacity: 0,
                                                                                                                y: 10
                                                                                                            },
                                                                                                            whileInView: {
                                                                                                                opacity: 1,
                                                                                                                y: 0
                                                                                                            },
                                                                                                            viewport: {
                                                                                                                once: true
                                                                                                            },
                                                                                                            transition: {
                                                                                                                duration: 0.4,
                                                                                                                delay: 0.8
                                                                                                            },
                                                                                                            className: "w-full mt-3 space-y-2",
                                                                                                            children: [
                                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                    className: "flex items-center justify-between border-b border-border/50 pb-1",
                                                                                                                    children: [
                                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                            className: "text-xs md:text-sm text-muted-foreground",
                                                                                                                            children: "轴向尺寸"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                            lineNumber: 515,
                                                                                                                            columnNumber: 47
                                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                            className: "text-xs md:text-sm font-medium text-foreground",
                                                                                                                            children: "87.5mm"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                            lineNumber: 516,
                                                                                                                            columnNumber: 47
                                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                                    ]
                                                                                                                }, void 0, true, {
                                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                    lineNumber: 514,
                                                                                                                    columnNumber: 45
                                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                    className: "flex items-center justify-between border-b border-border/50 pb-1",
                                                                                                                    children: [
                                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                            className: "text-xs md:text-sm text-muted-foreground",
                                                                                                                            children: "重量"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                            lineNumber: 520,
                                                                                                                            columnNumber: 47
                                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                            className: "text-xs md:text-sm font-medium text-foreground",
                                                                                                                            children: "11kg"
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                            lineNumber: 521,
                                                                                                                            columnNumber: 47
                                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                                    ]
                                                                                                                }, void 0, true, {
                                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                    lineNumber: 519,
                                                                                                                    columnNumber: 45
                                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                                            ]
                                                                                                        }, void 0, true, {
                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                            lineNumber: 506,
                                                                                                            columnNumber: 43
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 481,
                                                                                                    columnNumber: 41
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                            lineNumber: 433,
                                                                                            columnNumber: 39
                                                                                        }, ("TURBOPACK compile-time value", void 0)) : index === 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/waterproof-demonstration.png"),
                                                                                            alt: "PCB定子防水性展示",
                                                                                            className: "w-full h-full object-contain",
                                                                                            loading: "lazy"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                            lineNumber: 527,
                                                                                            columnNumber: 39
                                                                                        }, ("TURBOPACK compile-time value", void 0)) : index === 3 ? /* 加工成本低 - 两个图片左右布局 */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "relative w-full max-w-md flex flex-row items-start gap-4",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "relative flex-1 flex flex-col items-center",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                            className: "relative w-full rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm overflow-hidden",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/yasa.png"),
                                                                                                                alt: "Yasa自动化生产线",
                                                                                                                className: "w-full h-auto object-contain",
                                                                                                                loading: "lazy"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                lineNumber: 539,
                                                                                                                columnNumber: 45
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                            lineNumber: 538,
                                                                                                            columnNumber: 43
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                            initial: {
                                                                                                                opacity: 0,
                                                                                                                y: 10
                                                                                                            },
                                                                                                            whileInView: {
                                                                                                                opacity: 1,
                                                                                                                y: 0
                                                                                                            },
                                                                                                            viewport: {
                                                                                                                once: true
                                                                                                            },
                                                                                                            transition: {
                                                                                                                duration: 0.4,
                                                                                                                delay: 0.5
                                                                                                            },
                                                                                                            className: "text-center mt-3",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                                className: "text-xs md:text-sm font-medium text-foreground",
                                                                                                                children: "Yasa 几亿美金自动定子线"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                lineNumber: 553,
                                                                                                                columnNumber: 45
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                            lineNumber: 546,
                                                                                                            columnNumber: 43
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 537,
                                                                                                    columnNumber: 41
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "relative flex-1 flex flex-col items-center",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                            className: "relative w-full rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm overflow-hidden",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$image$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImagePath"])("/assets/zhouxiang.png"),
                                                                                                                alt: "轴向电机铁芯压铸工艺",
                                                                                                                className: "w-full h-auto object-contain",
                                                                                                                loading: "lazy"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                lineNumber: 560,
                                                                                                                columnNumber: 45
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                            lineNumber: 559,
                                                                                                            columnNumber: 43
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                                            initial: {
                                                                                                                opacity: 0,
                                                                                                                y: 10
                                                                                                            },
                                                                                                            whileInView: {
                                                                                                                opacity: 1,
                                                                                                                y: 0
                                                                                                            },
                                                                                                            viewport: {
                                                                                                                once: true
                                                                                                            },
                                                                                                            transition: {
                                                                                                                duration: 0.4,
                                                                                                                delay: 0.6
                                                                                                            },
                                                                                                            className: "text-center mt-3",
                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                                className: "text-xs md:text-sm font-medium text-foreground",
                                                                                                                children: "和轴向电机铁芯压铸工艺难"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                                lineNumber: 574,
                                                                                                                columnNumber: 45
                                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                            lineNumber: 567,
                                                                                                            columnNumber: 43
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 558,
                                                                                                    columnNumber: 41
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                            lineNumber: 535,
                                                                                            columnNumber: 39
                                                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-center space-y-4",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                                                    className: "w-24 h-24 mx-auto text-primary/40 group-hover:text-primary/60 transition-colors"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 580,
                                                                                                    columnNumber: 41
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                    className: "text-sm text-muted-foreground italic leading-relaxed",
                                                                                                    children: advantage.imagePlaceholder
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                                    lineNumber: 581,
                                                                                                    columnNumber: 41
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                            lineNumber: 579,
                                                                                            columnNumber: 39
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                        lineNumber: 430,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                                lineNumber: 425,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                            lineNumber: 258,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                                    lineNumber: 213,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, index, false, {
                                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: scrollPrev,
                                            className: "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0",
                                            variant: "ghost",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                strokeWidth: 3,
                                                className: "h-12 w-12 transition-colors text-[#2dc2b3]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                lineNumber: 604,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                            lineNumber: 599,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: scrollNext,
                                            className: "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-auto w-auto bg-transparent border-0 shadow-none hover:bg-transparent p-0",
                                            variant: "ghost",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                strokeWidth: 3,
                                                className: "h-12 w-12 transition-colors text-[#2dc2b3]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                                lineNumber: 611,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                            lineNumber: 606,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center gap-2 mt-6",
                                    children: advantages.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>scrollTo(index),
                                            className: `h-2 rounded-full transition-all duration-300 ${current === index ? "bg-primary w-10 shadow-lg shadow-primary/50" : "bg-primary/30 w-2 hover:bg-primary/50"}`,
                                            "aria-label": `Go to slide ${index + 1}`
                                        }, index, false, {
                                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                            lineNumber: 618,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                                    lineNumber: 616,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/PCBMotorAdvantages.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/PCBMotorAdvantages.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shimmer {
          animation: shimmer 3s infinite;
        }
      `
            }, void 0, false, {
                fileName: "[project]/components/PCBMotorAdvantages.tsx",
                lineNumber: 634,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/PCBMotorAdvantages.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PCBMotorAdvantages, "ok/5gKoIlJgGnOkhF+F9wp5gOqM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCarouselAutoPlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCarouselAutoPlay"]
    ];
});
_c = PCBMotorAdvantages;
var _c;
__turbopack_context__.k.register(_c, "PCBMotorAdvantages");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/pcb-coil-axial/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AxialMotorStatorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PCBMotorSlider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PCBMotorSlider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PCBMotorAdvantages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PCBMotorAdvantages.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function AxialMotorStatorPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "pt-20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PCBMotorSlider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PCBMotorSlider"], {}, void 0, false, {
                    fileName: "[project]/app/pcb-coil-axial/page.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PCBMotorAdvantages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PCBMotorAdvantages"], {}, void 0, false, {
                    fileName: "[project]/app/pcb-coil-axial/page.tsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/pcb-coil-axial/page.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/pcb-coil-axial/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = AxialMotorStatorPage;
var _c;
__turbopack_context__.k.register(_c, "AxialMotorStatorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_5a1e1a5d._.js.map