/**
 * Default policy configurations for Anchor agents.
 */
export interface DefaultPolicyPackConfig {
    allowedDomains?: string[] | null;
    maxQuerySize?: number | null;
    requireApprovalFor?: string[] | null;
    blockPii?: boolean;
    blockSecrets?: boolean;
}

const DEFAULT_POLICY_CONFIG = {
    maxQuerySize: 1000,
    requireApprovalFor: ['delete', 'update', 'export'],
    blockPii: true,
    blockSecrets: true,
} as const;

/**
 * Production ready default policies for agent config.
 *
 * @example
 * ```typescript
 * import { defaultPolicyPack } from 'anchorai';
 *
 * // Use default policies
 * await anchor.config.update(agent.id, defaultPolicyPack());
 *
 * // configure defaults - disable secrets, remove query size limit
 * await anchor.config.update(agent.id, defaultPolicyPack({
 *   blockSecrets: false,
 *   maxQuerySize: null
 * }));
 * ```
 */
export function defaultPolicyPack(
    config: DefaultPolicyPackConfig = {}
): { policies: Record<string, any> } {
    const policies: Record<string, any> = {};

    if (Array.isArray(config.allowedDomains)) {
        policies.allowed_domains = config.allowedDomains;
    }

    if (config.maxQuerySize != null) {
        policies.max_query_size = config.maxQuerySize;
    } else if (config.maxQuerySize === undefined) {
        policies.max_query_size = DEFAULT_POLICY_CONFIG.maxQuerySize;
    }

    if (config.requireApprovalFor != null) {
        policies.require_approval_for = config.requireApprovalFor;
    } else if (config.requireApprovalFor === undefined) {
        policies.require_approval_for = DEFAULT_POLICY_CONFIG.requireApprovalFor;
    }

    policies.block_pii = config.blockPii ?? DEFAULT_POLICY_CONFIG.blockPii;
    policies.block_secrets = config.blockSecrets ?? DEFAULT_POLICY_CONFIG.blockSecrets;

    return { policies };
}