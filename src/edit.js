/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody,	TextControl, SelectControl, __experimentalNumberControl as NumberControl } from "@wordpress/components";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } 	= props;

	const changeVideoId = (videoUrl) => {
		var url = new URL(videoUrl);
		var videoID = url.searchParams.get("v");
		setAttributes({
			video_id: videoID,
		});
	}
	return (
		<p {...useBlockProps()}>
			{
				<>
				<InspectorControls>
					<PanelBody title="Youtube Link">
						<TextControl
							label="Add Youtube Link"
							value={ "https://www.youtube.com/embed/"+attributes.video_id }
 							onChange={changeVideoId}
						/>
					</PanelBody>
					<PanelBody title="On Scroll Settings">
						<span style={{paddingBottom:'4px'}}>Video possion on scroll</span>
							<div style={{marginBottom:'15px'}}>
								<SelectControl
									value={attributes.video_possion}
									options={[
										{ label: 'Top-Right', value: 'tr' },
										{ label: 'Top-Left', value: 'tl' },
										{ label: 'Bottom-Right', value: 'br' },
										{ label: 'Bottom-Left', value: 'bl' },
									]}
									onChange={(video_possion) => setAttributes({video_possion})}
								/>
							</div>
							{
								(attributes.video_possion == "tr" || attributes.video_possion == "tl" ) &&
								<div style={{marginBottom:'10px'}}>
									<NumberControl
									isShiftStepEnabled={ true }
									onChange={(top) => setAttributes({top})}
									label="Top Margin"
									shiftStep={ 10 }
									value={ attributes.top }
									/>
								</div>
							}
							{
								(attributes.video_possion == "bl" || attributes.video_possion == "tl" ) &&
								<div style={{marginBottom:'10px'}}>
									<NumberControl
										isShiftStepEnabled={ true }
										onChange={(left) => setAttributes({left})}
										label="Left Margin"
										shiftStep={ 10 }
										value={ attributes.left }
									/>
								</div>
							}	
							{
								(attributes.video_possion == "tr" || attributes.video_possion == "br" ) &&
								<div style={{marginBottom:'10px'}}>
									<NumberControl
										isShiftStepEnabled={ true }
										onChange={(right) => setAttributes({right})}
										label="Right Margin"
										shiftStep={ 10 }
										value={ attributes.right }
									/>
								</div>
							}
							{
								(attributes.video_possion == "br" || attributes.video_possion == "bl" ) &&
								<div style={{marginBottom:'10px'}}>
									<NumberControl
										isShiftStepEnabled={ true }
										onChange={(bottom) => setAttributes({bottom})}
										label="Bottom Margin"
										shiftStep={ 10 }
										value={ attributes.bottom }
									/>
								</div>
							}
					</PanelBody>
				</InspectorControls>
				<div>
				<iframe width="420" height="345" src={"https://www.youtube.com/embed/"+attributes.video_id} ></iframe>
				</div>
				</>
			}
		</p>
	);
}
