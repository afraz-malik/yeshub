import React, { Component } from "react"
import values from "lodash/values"

import TreeNode from "./Nodes/TreeNode"

type TreeProps = {
    comments: Record<string, any>
    onSelect: (args: any) => void
}

export default class Tree extends Component<TreeProps, any> {
    state = {
        nodes: this.props.comments,
    }

    getRootNodes = () => {
        const { nodes } = this.state
        return values(nodes).filter(node => node.children.length === 0)
    }

    getChildNodes = (node: any) => {
        const { nodes } = this.state
        if (!node.children) return []
        return node.children.map((path: any) => {
            return nodes[path._id]
        })
    }

    onToggle = (node: any) => {
        const { nodes } = this.state
        nodes[node.path].isOpen = !node.isOpen
        this.setState({ nodes })
    }

    onNodeSelect = (node: any) => {
        const { onSelect } = this.props
        onSelect(node)
    }

    render() {
        const rootNodes = this.getRootNodes()

        return (
            <div>
                {rootNodes.map(node => (
                    <TreeNode
                        node={node}
                        getChildNodes={this.getChildNodes}
                        onToggle={this.onToggle}
                        onNodeSelect={this.onNodeSelect}
                    />
                ))}
            </div>
        )
    }
}
