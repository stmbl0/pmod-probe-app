<script lang="ts">
    //// Export Info about Widget ////
    export const WIDGET_ID = "p-seminar::fibonacci-assembly";
    export const WIDGET_NAME = "Fibonacci Assembly";

    //// Basic Imports ////
    import BaseWidget from "../BaseWidget.svelte";

    import { getSelector } from "$lib/backend/project/utils";
    import { BitFetcher } from "$lib/backend/data/dataFetcher";

    import type { Selector } from "$lib/backend/types";
    import type { WidgetLayoutConfig } from "../WidgetConfig";

    //// Configuration ////
    type WidgetConfig_T = {
    }

    export let config: WidgetConfig_T|{[key: string]:any};
    export let layout: WidgetLayoutConfig;

    //// Widget Imports ////

    //// Data ////
    const pcBits = new BitFetcher(getSelector("PC_Data")).bits; 

    let pc = 0;
    $: pc = bitsToDec($pcBits);

    function bitsToDec(bits: boolean[]) {
        return parseInt(bits.map(b => b?"1":"0").join(""), 2);
    }
</script>

<BaseWidget bind:layout>
    <div class="assembly-widget">
        <div class="widget-label">
            Fibonacci Assembly
        </div>

        <div class="assembly">
            <svg width="392" height="1138" viewBox="0 0 392 1138" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Assembly Content">
                <g id="Line 1">
                <text id="Line Number" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="20.125" y="30.6083">1</tspan></text>
                <text id="Line Comment" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="30.7576">; Program to compute the Fibonacci sequence</tspan></text>
                </g>
                <g id="Line 2">
                <text id="Line Number_2" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="20.125" y="57.3353">2</tspan></text>
                <text id="Line Comment_2" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="56.9019">; Load 1 into the Accumulator and store it</tspan></text>
                </g>
                <g id="Line 3">
                <text id="Line Number_3" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="20.125" y="83.4914">3</tspan></text>
                <text id="Line Instruction" fill={pc==0?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="83.4914">LDI</tspan></text>
                <text id="Line Arg 1" fill={pc==1?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8359" y="83.4914">0x01</tspan></text>
                </g>
                <g id="Line 4">
                <text id="Line Number_4" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="20.125" y="109.336">4</tspan></text>
                <text id="Line Instruction_2" fill={pc==2?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="109.336">STA</tspan></text>
                <text id="Line Arg 1_2" fill={pc==3?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8359" y="109.336">0x01</tspan></text>
                <text id="Line Arg 2" fill={pc==4?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="132.836" y="109.336">0x00</tspan></text>
                </g>
                <g id="Line 5">
                <text id="Line Number_5" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="20.125" y="135.335">5</tspan></text>
                </g>
                <g id="Line 6">
                <text id="Line Number_6" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="20.125" y="161.336">6</tspan></text>
                <text id="Line Instruction_3" fill={pc==5?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="161.336">CLA</tspan></text>
                </g>
                <g id="Line 7">
                <text id="Line Number_7" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="20.125" y="186.757">7</tspan></text>
                <text id="Line Instruction_4" fill={pc==6?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="186.757">MVA</tspan></text>
                </g>
                <g id="Line 8">
                <text id="Line Number_8" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="20.125" y="212.602">8</tspan></text>
                <text id="Line Instruction_5" fill={pc==7?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="212.602">STA</tspan></text>
                <text id="Line Arg 1_3" fill={pc==8?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8359" y="212.602">0x01</tspan></text>
                <text id="Line Arg 2_2" fill={pc==9?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="132.836" y="212.602">0x01</tspan></text>
                </g>
                <g id="Line 9">
                <text id="Line Number_9" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="20.125" y="238.758">9</tspan></text>
                </g>
                <g id="Line 10">
                <text id="Line Number_10" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="264.757">10</tspan></text>
                <text id="Line Instruction_6" fill="#AC58D3" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="264.969">@loop</tspan></text>
                </g>
                <g id="Line 11">
                <text id="Line Number_11" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="290.758">11</tspan></text>
                <text id="Line Comment_3" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="290.324">; Load a into DR</tspan></text>
                </g>
                <g id="Line 12">
                <text id="Line Number_12" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="317.18">12</tspan></text>
                <text id="Line Instruction_7" fill={pc==10?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="317.18">LDA</tspan></text>
                <text id="Line Arg 1_4" fill={pc==11?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8359" y="317.18">0x01</tspan></text>
                <text id="Line Arg 2_3" fill={pc==12?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="132.836" y="317.18">0x00</tspan></text>
                </g>
                <g id="Line 13">
                <text id="Line Number_13" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="342.757">13</tspan></text>
                <text id="Line Instruction_8" fill={pc==13?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="342.757">MVA</tspan></text>
                </g>
                <g id="Line 14">
                <text id="Line Number_14" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="368.758">14</tspan></text>
                <text id="Line Comment_4" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="368.324">; Load b into the Accumulator</tspan></text>
                </g>
                <g id="Line 15">
                <text id="Line Number_15" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="395.18">15</tspan></text>
                <text id="Line Instruction_9" fill={pc==14?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="395.18">LDA</tspan></text>
                <text id="Line Arg 1_5" fill={pc==15?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8359" y="395.18">0x01</tspan></text>
                <text id="Line Arg 2_4" fill={pc==16?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="132.836" y="395.18">0x01</tspan></text>
                </g>
                <g id="Line 16">
                <text id="Line Number_16" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="421.335">16</tspan></text>
                </g>
                <g id="Line 17">
                <text id="Line Number_17" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="447.913">17</tspan></text>
                <text id="Line Comment_5" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="447.48">; Add a + b and store it as c</tspan></text>
                </g>
                <g id="Line 18">
                <text id="Line Number_18" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="474.336">18</tspan></text>
                <text id="Line Instruction_10" fill={pc==17?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="474.336">ADD</tspan></text>
                </g>
                <g id="Line 19">
                <text id="Line Number_19" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="500.336">19</tspan></text>
                <text id="Line Instruction_11" fill={pc==18?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="500.336">STA</tspan></text>
                <text id="Line Arg 1_6" fill={pc==19?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8359" y="500.336">0x01</tspan></text>
                <text id="Line Arg 2_5" fill={pc==20?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="132.836" y="500.336">0x02</tspan></text>
                </g>
                <g id="Line 20">
                <text id="Line Number_20" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="526.491">20</tspan></text>
                </g>
                <g id="Line 21">
                <text id="Line Number_21" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="553.069">21</tspan></text>
                <text id="Line Comment_6" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="552.635">; Replace a with the current value of b</tspan></text>
                </g>
                <g id="Line 22">
                <text id="Line Number_22" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="579.491">22</tspan></text>
                <text id="Line Instruction_12" fill={pc==21?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="579.491">LDA</tspan></text>
                <text id="Line Arg 1_7" fill={pc==22?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8359" y="579.491">0x01</tspan></text>
                <text id="Line Arg 2_6" fill={pc==23?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="132.836" y="579.491">0x01</tspan></text>
                </g>
                <g id="Line 23">
                <text id="Line Number_23" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="605.491">23</tspan></text>
                <text id="Line Instruction_13" fill={pc==24?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="605.491">STA</tspan></text>
                <text id="Line Arg 1_8" fill={pc==25?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8359" y="605.491">0x01</tspan></text>
                <text id="Line Arg 2_7" fill={pc==26?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="132.836" y="605.491">0x00</tspan></text>
                </g>
                <g id="Line 24">
                <text id="Line Number_24" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="631.646">24</tspan></text>
                </g>
                <g id="Line 25">
                <text id="Line Number_25" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="658.224">25</tspan></text>
                <text id="Line Comment_7" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="657.791">; Replace b with the new value of c</tspan></text>
                </g>
                <g id="Line 26">
                <text id="Line Number_26" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="684.647">26</tspan></text>
                <text id="Line Instruction_14" fill={pc==27?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="684.647">LDA</tspan></text>
                <text id="Line Arg 1_9" fill={pc==28?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8359" y="684.647">0x01</tspan></text>
                <text id="Line Arg 2_8" fill={pc==29?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="132.836" y="684.647">0x02</tspan></text>
                </g>
                <g id="Line 27">
                <text id="Line Number_27" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="710.647">27</tspan></text>
                <text id="Line Instruction_15" fill={pc==30?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="710.647">STA</tspan></text>
                <text id="Line Arg 1_10" fill={pc==31?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8359" y="710.647">0x01</tspan></text>
                <text id="Line Arg 2_9" fill={pc==32?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="132.836" y="710.647">0x01</tspan></text>
                </g>
                <g id="Line 28">
                <text id="Line Number_28" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="736.802">28</tspan></text>
                </g>
                <g id="Line 29">
                <text id="Line Number_29" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="763.38">29</tspan></text>
                <text id="Line Comment_8" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="762.946">; Looping logic</tspan></text>
                </g>
                <g id="Line 30">
                <text id="Line Number_30" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="789.958">30</tspan></text>
                <text id="Line Comment_9" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="789.525">; Store 233 into DataRegister to compare</tspan></text>
                </g>
                <g id="Line 31">
                <text id="Line Number_31" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="816.113">31</tspan></text>
                <text id="Line Instruction_16" fill={pc==33?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="816.113">LDI</tspan></text>
                <text id="Line Arg 1_11" fill={pc==34?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8594" y="816.113">0xE9</tspan></text>
                </g>
                <g id="Line 32">
                <text id="Line Number_32" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="842.113">32</tspan></text>
                <text id="Line Instruction_17" fill={pc==35?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="842.113">MVA</tspan></text>
                </g>
                <g id="Line 33">
                <text id="Line Number_33" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="868.535">33</tspan></text>
                <text id="Line Comment_10" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="868.102">; Load c into accumulator and compare</tspan></text>
                </g>
                <g id="Line 34">
                <text id="Line Number_34" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="894.958">34</tspan></text>
                <text id="Line Instruction_18" fill={pc==36?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="894.958">LDA</tspan></text>
                <text id="Line Arg 1_12" fill={pc==37?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="87.8359" y="894.958">0x01</tspan></text>
                <text id="Line Arg 2_10" fill={pc==38?"#FFFFFF":"#798297"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="132.836" y="894.958">0x02</tspan></text>
                </g>
                <g id="Line 35">
                <text id="Line Number_35" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="920.958">35</tspan></text>
                <text id="Line Instruction_19" fill={pc==39?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="920.958">EQ</tspan></text>
                </g>
                <g id="Line 36">
                <text id="Line Number_36" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="947.113">36</tspan></text>
                <text id="Line Comment_11" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="946.68">; If c=233, jump to end, otherwise back to @loop</tspan></text>
                </g>
                <g id="Line 37">
                <text id="Line Number_37" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="973.269">37</tspan></text>
                <text id="Line Instruction_20" fill={pc==40?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="973.269">JPNZ</tspan></text>
                <text id="Line Arg 1_13" fill={pc==41||pc==42?"#FFFFFF":"#AC58D3"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="88" y="973.18">@end</tspan></text>
                </g>
                <g id="Line 38">
                <text id="Line Number_38" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="999.291">38</tspan></text>
                <text id="Line Instruction_21" fill={pc==43?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="999.291">JMP</tspan></text>
                <text id="Line Arg 1_14" fill={pc==44||pc==45?"#FFFFFF":"#AC58D3"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="88" y="999.402">@loop</tspan></text>
                </g>
                <g id="Line 39">
                <text id="Line Number_39" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="1025.71">39</tspan></text>
                </g>
                <g id="Line 40">
                <text id="Line Number_40" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="1052.29">40</tspan></text>
                <text id="Line Comment_12" fill="#4A5259" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em"><tspan x="41" y="1051.86">; Loop infinitely once finished</tspan></text>
                </g>
                <g id="Line 41">
                <text id="Line Number_41" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="1078.29">41</tspan></text>
                <text id="Line Instruction_22" fill="#AC58D3" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="1078.5">@end</tspan></text>
                </g>
                <g id="Line 42">
                <text id="Line Number_42" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="1103.87">42</tspan></text>
                <text id="Line Instruction_23" fill={pc==46?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="1103.87">NOP</tspan></text>
                </g>
                <g id="Line 43">
                <text id="Line Number_43" fill="#393F44" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="300" letter-spacing="0em"><tspan x="11.25" y="1129.89">43</tspan></text>
                <text id="Line Instruction_24" fill={pc==47?"#FFFFFF":"#5367D1"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="41" y="1129.89">JMP</tspan></text>
                <text id="Line Arg 1_15" fill={pc==48?"#FFFFFF":"#AC58D3"} xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" font-weight="500" letter-spacing="0em"><tspan x="88" y="1130">@end</tspan></text>
                </g>
                </g>
            </svg>
                
        </div>
    </div>
</BaseWidget>

<style lang="scss">
    .assembly-widget {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }

    .widget-label {
        width: 100%;

        font-family: "Roboto";
        font-size: 16px;
        font-weight: 800;
        color: #ffffff;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0.3em 0em;
    }

    .assembly {
        width: 100%;
        height: 100%;
        max-height: 48vh;

        border-radius: 12px;
        background-color: #0e1113;

        overflow-x: hidden;
        overflow-y: auto;

        svg {
            width: 100%;

            margin-top: 4px;
            margin-bottom: 8px;
            margin-right: 8px;
        }
    }
</style>