"""
MCP (Model Context Protocol) server integration for Anchor SDK.

This module provides a minimal wrapper for MCP servers to enable
governance capabilities. Implementation is intentionally skeletal
to allow incremental enhancement.
"""

from typing import Any


class AnchorMCPServer:
    """
    Wrapper for MCP servers that enables Anchor governance.

    This is a minimal integration skeleton.
    Enforcement, auditing, and context handling
    will be added incrementally.

    Args:
        anchor: Anchor SDK instance for governance
        agent_id: ID of the agent using this MCP server
        base_server: The underlying MCP server to wrap

    Example:
        >>> from anchor import Anchor
        >>> from anchor.integrations.mcp import AnchorMCPServer
        >>>
        >>> anchor = Anchor(api_key="your-key")
        >>> agent = anchor.agents.create("mcp-agent")
        >>>
        >>> mcp_server = AnchorMCPServer(
        ...     anchor=anchor,
        ...     agent_id=agent.id,
        ...     base_server=your_mcp_server
        ... )
        >>> mcp_server.start()
    """

    def __init__(self, anchor: Any, agent_id: str, base_server: Any):
        """
        Initialize the Anchor MCP server wrapper.

        Args:
            anchor: Anchor SDK instance
            agent_id: Agent identifier
            base_server: MCP server instance to wrap
        """
        self.anchor = anchor
        self.agent_id = agent_id
        self.base_server = base_server

    def start(self) -> Any:
        """
        Start the wrapped MCP server.

        Currently delegates directly to the base server.
        Future versions will add governance hooks.

        Returns:
            Result from the base server's start method
        """
        return self.base_server.start()
