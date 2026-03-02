export const data = {
    type: "user",
    message: {
        role: "user",
        content: [
            {
                type: "text",
                text: "In the /Users/ben/khan/perseus codebase, I need to find all files that either:\n1. Export a `get*PublicWidgetOptions` function as a default export (in the util files under packages/perseus-core/src/widgets/*/*)\n2. Import `get*PublicWidgetOptions` functions (either as default imports or named imports)\n\nThe functions are:\n- getOrdererPublicWidgetOptions (from ./widgets/orderer/orderer-util)\n- getCategorizerPublicWidgetOptions (from ./widgets/categorizer/categorizer-util)\n- getCSProgramPublicWidgetOptions (from ./widgets/cs-program/cs-program-util)\n- getExpressionPublicWidgetOptions (from ./widgets/expression/expression-util)\n- getFreeResponsePublicWidgetOptions (from ./widgets/free-response/free-response-util)\n- getGrapherPublicWidgetOptions (from ./widgets/grapher/grapher-util)\n- getGroupPublicWidgetOptions (from ./widgets/group/group-util)\n- getInteractiveGraphPublicWidgetOptions (from ./widgets/interactive-graph/interactive-graph-util)\n- getLabelImagePublicWidgetOptions (from ./widgets/label-image/label-image-util)\n- getSorterPublicWidgetOptions (from ./widgets/sorter/sorter-util)\n- getDropdownPublicWidgetOptions (from ./widgets/dropdown/dropdown-util)\n- getNumericInputPublicWidgetOptions (from ./widgets/numeric-input/numeric-input-util)\n- getNumberLinePublicWidgetOptions (from ./widgets/number-line/number-line-util)\n- getRadioPublicWidgetOptions (from ./widgets/radio/radio-util)\n- getTablePublicWidgetOptions (from ./widgets/table/table-util)\n- getIFramePublicWidgetOptions (from ./widgets/iframe/iframe-util)\n- getMatrixPublicWidgetOptions (from ./widgets/matrix/matrix-util)\n- getPlotterPublicWidgetOptions (from ./widgets/plotter/plotter-util)\n- getMatcherPublicWidgetOptions (from ./widgets/matcher/matcher-util)\n\nFor each of the util files, show me:\n1. How they export the function (default or named)\n2. Any other files that import these functions\n\nUse the grep and read tools to find this information. Do NOT write any code.",
            },
        ],
    },
    parent_tool_use_id: "toolu_016b4k9DTwPadojwJnMzj52P",
    session_id: "3d584eb2-5ebd-4cd9-8b76-cab6731c439f",
    uuid: "dc95c7d0-8fcb-4400-b567-7f45ba09c7d8",
};

export const expected = [];
