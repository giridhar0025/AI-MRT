import { z } from 'zod'

export const columnDefinition = z.object({
  id: z.string().min(1),
  header: z.string().min(1),
  accessorKey: z.string().optional(),
})

export const toolCallSchema = z.discriminatedUnion('action', [
  z.object({
    action: z.literal('addColumn'),
    column: columnDefinition,
  }),
  z.object({ action: z.literal('removeColumn'), columnId: z.string() }),
  z.object({ action: z.literal('renameColumn'), columnId: z.string(), newHeader: z.string() }),
  z.object({ action: z.literal('reorderColumns'), order: z.array(z.string()) }),
  z.object({ action: z.literal('pinColumn'), columnId: z.string(), position: z.enum(['left', 'right']) }),
  z.object({ action: z.literal('resizeColumn'), columnId: z.string(), size: z.number() }),
  z.object({ action: z.literal('addComputedColumn'), columnId: z.string(), header: z.string(), formula: z.string(), dataType: z.enum(['number','string','boolean']).optional() }),
  z.object({ action: z.literal('addAggregation'), columnId: z.string(), operation: z.enum(['sum','avg','min','max','count']) }),
  z.object({ action: z.literal('applyFilter'), columnId: z.string(), operator: z.string(), value: z.any() }),
  z.object({ action: z.literal('clearFilters') }),
  z.object({ action: z.literal('applySort'), columnId: z.string(), direction: z.enum(['asc','desc']) }),
  z.object({ action: z.literal('groupBy'), columns: z.array(z.string()) }),
  z.object({ action: z.literal('setPage'), page: z.number() }),
  z.object({ action: z.literal('setPageSize'), size: z.number() }),
  z.object({ action: z.literal('selectRowsByCondition'), condition: z.object({ columnId: z.string(), operator: z.string(), value: z.any() }) }),
  z.object({ action: z.literal('highlight'), target: z.enum(['cell','row']), columnId: z.string().optional(), condition: z.object({ operator: z.string(), value: z.any() }), style: z.object({ color: z.string().optional(), backgroundColor: z.string().optional(), icon: z.string().optional(), fontWeight: z.string().optional() }) }),
  z.object({ action: z.literal('clearHighlights') }),
  z.object({ action: z.literal('exportData'), format: z.enum(['csv','xlsx','json']), onlySelected: z.boolean().optional() }),
  z.object({ action: z.literal('summarizeVisibleRows') }),
])

export type ToolCall = z.infer<typeof toolCallSchema>
