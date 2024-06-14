import React, {Component} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

import {CoolStyles} from "common/ui/CoolImports";

import FractoIncrementalRender from "fracto/render/FractoIncrementalRender";
import {get_ideal_level} from "fracto/data/FractoData";

import FractoCanvasDetails from "./FractoCanvasDetails"

const FrameWrapper = styled(CoolStyles.Block)`
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   overflow: hidden;
   background-color: white;
`;

export class PageMain extends Component {
   static propTypes = {
      app_name: PropTypes.string.isRequired,
   }

   state = {
      width_px: 0,
      height_px: 0,
      frame_wrapper_ref: React.createRef(),
      indexed_loading: false,
      image_ready: false,
      scope: 0.1275,
      focal_point: {x: -1.2721078058803346, y: 0.05234162923252158},
      video_id: 0, // Utils.random_id(),
      frame_index: 0,
      canvas_buffer: []
   }

   componentDidMount() {
      this.resize_wrapper();
      window.addEventListener("resize", this.resize_wrapper);
   }

   resize_wrapper = (e = null) => {
      const {frame_wrapper_ref} = this.state
      if (e) {
         console.log("resize", e)
         this.setState({
            width_px: e.target.innerWidth,
            height_px: e.target.innerHeight
         })
      } else {
         const frame_wrapper = frame_wrapper_ref.current
         if (frame_wrapper) {
            const bounds = frame_wrapper.getBoundingClientRect()
            this.setState({
               width_px: bounds.width,
               height_px: bounds.height
            })
         }
      }
   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.resize_wrapper);
   }

   on_plan_complete = (canvas_buffer) => {
      this.setState({
         image_ready: true,
         canvas_buffer: canvas_buffer
      })
   }

   render() {
      const {
         frame_wrapper_ref,
         width_px,
         height_px,
         indexed_loading,
         scope,
         focal_point,
         video_id,
         frame_index,
         canvas_buffer
      } = this.state
      let canvas = []
      let data_view = []
      const canvas_width = 1024
      const aspect_ratio = 768 / 1024
      const level = get_ideal_level(width_px, scope, 2.5)
      if (indexed_loading || !width_px || !height_px) {
         canvas = "loading..."
      } else {
         canvas = <FractoIncrementalRender
            width_px={canvas_width}
            scope={scope}
            focal_point={focal_point}
            level={level}
            aspect_ratio={aspect_ratio}
            on_plan_complete={this.on_plan_complete}
            video_id={video_id}
            frame_index={frame_index}
            disabled={indexed_loading}
         />
         data_view = <FractoCanvasDetails
            width_px={canvas_width}
            focal_point={focal_point}
            scope={scope}
            level={level}
            aspect_ratio={aspect_ratio}
            video_id={video_id}
            frame_index={frame_index}
            canvas_buffer={canvas_buffer}
         />
      }
      return <FrameWrapper
         ref={frame_wrapper_ref}>
         {canvas}
         {data_view}
      </FrameWrapper>
   }
}

export default PageMain;
