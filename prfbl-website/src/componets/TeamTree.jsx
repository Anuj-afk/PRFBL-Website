import React from "react";
import TeamMemberCard from "./TeamMemberCard";

function buildTree(members, parentId = null) {
    return members
        .filter((member) => member.juniorOf === parentId)
        .map((member) => ({
            ...member,
            juniors: buildTree(members, member._id),
        }));
}

export default function TeamTree({ team }) {
    const tree = buildTree(team);

    return (
        
        <div className="space-y-4">
            {
                console.log(team)
            }
            {tree.map((member) => (
                <TeamMemberCard key={member._id} member={member} />
            ))}
        </div>
    );
}
