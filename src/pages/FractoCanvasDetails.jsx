import React, {Component} from 'react';
import styled from "styled-components";

import {CoolStyles} from "common/ui/CoolImports";
import PropTypes from "prop-types";
import {render_coordinates} from 'fracto/common/FractoStyles';

const SectionBlock = styled(CoolStyles.Block)`
   margin-left: 1rem;
   margin-bottom: 1rem;
`;

const LineBlock = styled(CoolStyles.Block)`
   margin: 0;
`;

export class FractoCanvasDetails extends Component {

   static propTypes = {
      width_px: PropTypes.number.isRequired,
      focal_point: PropTypes.object.isRequired,
      scope: PropTypes.number.isRequired,
      level: PropTypes.number.isRequired,
      aspect_ratio: PropTypes.number.isRequired,
      video_id: PropTypes.number.isRequired,
      frame_index: PropTypes.number.isRequired,
      canvas_buffer: PropTypes.array.isRequired,
   }

   render() {
      const {video_id, frame_index, width_px, aspect_ratio, focal_point, scope, level} = this.props
      const video_block = !video_id ? [] : [
         {label: "video id", data: video_id},
         {label: "frame_index", data: frame_index}
      ].map(item => {
         return <LineBlock>{`${item.label}: ${item.data}`}</LineBlock>
      })
      const canvas_block = [
         {label: "width", data: width_px},
         {label: "aspect ratio", data: `${aspect_ratio} : 1`},
      ].map(item => {
         return <LineBlock>{`${item.label}: ${item.data}`}</LineBlock>
      })
      const image_block = [
         {label: "focal_point", data: render_coordinates(focal_point.x, focal_point.y)},
         {label: "scope", data: scope},
         {label: "level", data: level},
      ].map(item => {
         return <LineBlock>{`${item.label}: `}{item.data}</LineBlock>
      })
      return <CoolStyles.InlineBlock>
         <SectionBlock>
            {video_block}
         </SectionBlock>
         <SectionBlock>
            {canvas_block}
         </SectionBlock>
         <SectionBlock>
            {image_block}
         </SectionBlock>
      </CoolStyles.InlineBlock>
   }
}

export default FractoCanvasDetails;
