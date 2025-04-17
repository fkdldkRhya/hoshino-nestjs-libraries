/* eslint-disable @typescript-eslint/no-explicit-any */
import { HoshinoConnectionFactoryService } from '../hoshino-connection-factory.service';

/**
 * Generic interface to represent a Prisma-like client
 * Users can extend or replace this with their own client type
 */
export interface BasePrismaClient {
  $transaction: <T>(fn: (tx: any) => Promise<T>) => Promise<T>;
  $connect: () => Promise<void>;
  $disconnect: () => Promise<void>;
  [key: string]: any;
}

/**
 * Interface for tenant client information
 * Users can extend this interface based on their specific tenant requirements
 */
export interface TenantClientInfo<T = any> {
  tenantType: string;
  tenantCode: string;
  tenantIdentifier: string;
  tenantDbUrl?: string;
  client: HoshinoConnectionFactoryService<T>;
  txClient?: T;
  [key: string]: any;
}

/**
 * Interface for tenant extraction strategy
 * This allows users to implement their own logic for extracting tenant information
 */
export interface TenantExtractorStrategy {
  /**
   * Extract tenant identifier from request or other source
   * @param context The context to extract tenant information from (e.g., request)
   * @returns The extracted tenant identifier
   */
  extractTenantIdentifier(context: any): string | Promise<string>;
}

/**
 * Interface for tenant resolver strategy
 * This allows users to implement their own logic for resolving tenant connection information
 */
export interface TenantResolverStrategy<T = any> {
  /**
   * Resolve tenant connection information based on tenant identifier
   * @param tenantIdentifier The tenant identifier
   * @returns Connection information for the tenant
   */
  resolveTenantConnections(
    tenantIdentifier: string
  ): Promise<TenantConnectionInfo[]>;
}

/**
 * Interface for tenant connection information
 * Users can extend this interface based on their specific connection requirements
 */
export interface TenantConnectionInfo {
  tenantType: string;
  tenantCode: string;
  tenantIdentifier: string;
  tenantDbUrl: string;
  [key: string]: any;
}

/**
 * Options for tenant transaction adapter
 */
export interface TenantTransactionOptions {
  timeout?: number;
  maxRetries?: number;
  isolationLevel?: string;
  [key: string]: any;
}
