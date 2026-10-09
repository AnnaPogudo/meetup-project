const SessionParticipantsTab = ({ participants = [], host }) => {

    if (participants.length === 0) {
        return <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm py-12">
            <MessageSquareIcon className="w-8 h-8 mb-2 text-slate-300" />
            <p>No participants were recoded in this meeting session.</p>
        </div>
    }

    return (
        <div>

        </div>
    )
}

export default SessionParticipantsTab