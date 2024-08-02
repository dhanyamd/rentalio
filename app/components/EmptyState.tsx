'use client'

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import Button from "./modals/Button"

interface EmptyStateprops{
    title? :string,
    subtitle? : string,
    showResets? : boolean
}
const EmptyState : React.FC<EmptyStateprops> = ({
    title = 'No exact matches',
    subtitle = 'Try changing or removing some of your filters',
    showResets
}) => {
    const router = useRouter()
    return (
        <div className="h-[60vh] flex flex-col justify-center items-center gap-2">
            <Heading
            center
            title={title}
            subtitle={subtitle}
            />
          <div className="w-48 mt-4">
            {showResets && (
                <Button 
                outline
                label="Remove all filters"
                onClick={() => router.push('/')}
                />
            )}
          </div>
        </div>
    )
}

export default EmptyState