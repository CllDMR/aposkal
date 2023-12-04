import { nanoid } from "nanoid";
import { z } from "zod";

import { and, eq, inArray, schema } from "@acme/db";

import {
  supplierCreateInput,
  supplierGetInput,
  supplierListInput,
  supplierUpdateInput,
} from "../inputs/supplier";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const supplierRouter = createTRPCRouter({
  list: protectedProcedure
    .input(supplierListInput)
    .query(async ({ ctx, input: _ }) => {
      return await ctx.db.query.supplier.findMany({
        where: eq(schema.supplier.tenantId, ctx.session.user.ti),
        with: {
          productsToSuppliers: {
            with: {
              product: true,
            },
          },
        },
      });
    }),

  get: protectedProcedure
    .input(supplierGetInput)
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.supplier.findFirst({
        where: and(
          eq(schema.supplier.tenantId, ctx.session.user.ti),
          eq(schema.supplier.id, input.id),
        ),
        with: {
          productsToSuppliers: {
            with: {
              product: true,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(supplierCreateInput)
    .mutation(async ({ ctx, input }) => {
      const { productIds, ...rest } = input;

      const supplierId = nanoid();

      const newSupplier = await ctx.db.insert(schema.supplier).values({
        ...rest,
        id: supplierId,
        tenantId: ctx.session.user.ti,
      });

      const productPromises = [];

      for (const productId of productIds) {
        productPromises.push(
          ctx.db
            .insert(schema.productsToSuppliers)
            .values({
              productId: productId.id,
              supplierId: supplierId,
            })
            .execute(),
        );
      }

      await Promise.all(productPromises);

      return newSupplier;
    }),

  update: protectedProcedure
    .input(supplierUpdateInput)
    .mutation(async ({ ctx, input }) => {
      const { productIds, id, ...rest } = input;

      const supplier = await ctx.db
        .select()
        .from(schema.supplier)
        .where(eq(schema.supplier.id, id))
        .limit(1)
        .then((a) => a[0]);

      if (!supplier) throw new Error("Supplier not found");

      await ctx.db
        .update(schema.supplier)
        .set(rest)
        .where(eq(schema.supplier.id, id));

      //#region Syncronize Relations - productsToSuppliers
      const productsToSuppliers = await ctx.db
        .select()
        .from(schema.productsToSuppliers)
        .where(eq(schema.productsToSuppliers.supplierId, id));

      const havingProductIds = productsToSuppliers.map(
        (productsToSupplier) => productsToSupplier.productId,
      );
      const toAddingProductIds = productIds.filter(
        (el) => !havingProductIds.includes(el.id),
      );
      const toRemovingProductIds = havingProductIds.filter(
        (el) => !productIds.map((productId) => productId.id).includes(el),
      );

      const productPromisesToInsert = [];
      const productPromisesToDelete = [];

      for (const productId of toAddingProductIds) {
        productPromisesToInsert.push(
          ctx.db
            .insert(schema.productsToSuppliers)
            .values({
              productId: productId.id,
              supplierId: id,
            })
            .execute(),
        );
      }

      for (const productId of toRemovingProductIds) {
        productPromisesToDelete.push(
          ctx.db
            .delete(schema.productsToSuppliers)
            .where(
              and(
                eq(schema.productsToSuppliers.productId, productId),
                eq(schema.productsToSuppliers.supplierId, id),
              ),
            )
            .execute(),
        );
      }

      await Promise.all(productPromisesToDelete);
      await Promise.all(productPromisesToInsert);
      //#endregion
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(schema.productsToSuppliers)
        .where(eq(schema.productsToSuppliers.supplierId, input));

      return await ctx.db
        .delete(schema.supplier)
        .where(eq(schema.supplier.id, input));
    }),

  deleteMany: protectedProcedure
    .input(z.string().array())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(schema.productsToSuppliers)
        .where(inArray(schema.productsToSuppliers.supplierId, input));

      return await ctx.db
        .delete(schema.supplier)
        .where(inArray(schema.supplier.id, input));
    }),
});
