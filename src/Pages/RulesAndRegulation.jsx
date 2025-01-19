import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetRulesAndRegulationQuery, useUpdateRulesAndRegulationMutation } from "../redux/Api/dashboardApi";
import { toast } from "sonner";

const RulesAndRegulation = () => {
    const { data: getRulesAndRegulation } = useGetRulesAndRegulationQuery()
    const [updateRules, { isLoading }] = useUpdateRulesAndRegulationMutation()
    const editor = useRef(null);
    const [content, setContent] = useState('');
    // const [isLoading, seLoading] = useState(false)
    const handleTerms = () => {
        const data = {
            description: content
        }
        updateRules(data).unwrap()
            .then((payload) => toast.success(payload?.message))
            .catch((error) => toast.error(error?.data?.message));
    }
    const config = {
        readonly: false,
        placeholder: 'Start typings...',
        style: {
            height: 600,
        },
        buttons: [
            'image', 'fontsize', 'bold', 'italic', 'underline', '|',
            'font', 'brush',
            'align'
        ]
    }
    useEffect(() => {
        setContent(getRulesAndRegulation?.data?.description);
    }, [getRulesAndRegulation])
    return (
        <div>
            <div className='start-center gap-2 mb-3 relative'>
                <div className='absolute top-6 left-2 flex items-center '>
                    <Link to={-1} className='py-1 px-2 rounded-md start-center gap-1 '><IoArrowBackSharp /></Link> <p>Rules & Regulation</p>
                </div>
            </div>
            <div className="custom-jodit-editor">
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => { }}
                />
            </div>
            <div className='text-center mt-3'>
                <button disabled={isLoading} onClick={handleTerms} className='px-8 py-2 rounded-sm bg-[#3475F1]  text-[var(--color-7)]' >Save</button>
            </div>
        </div>
    );
};

export default RulesAndRegulation;