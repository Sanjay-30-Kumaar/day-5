"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Member, MemberStatus } from "@/lib/types";

type SortKey =
  | "name"
  | "email"
  | "batch"
  | "city"
  | "status"
  | "joined";

type SortDirection = "asc" | "desc";

type MembersTableProps = {
  members: Member[];
};

const statusOptions: Array<"all" | MemberStatus> = [
  "all",
  "active",
  "inactive",
  "pending",
];

export default function MembersTable({
  members,
}: MembersTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"all" | MemberStatus>("all");

  const [sortKey, setSortKey] =
    useState<SortKey>("name");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((current) =>
        current === "asc" ? "desc" : "asc"
      );
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  }

  const filteredAndSortedMembers = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    const filtered = members.filter((member) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        member.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        member.email
          .toLowerCase()
          .includes(normalizedSearch) ||
        member.batch
          .toLowerCase()
          .includes(normalizedSearch) ||
        member.city
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        member.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      const first = a[sortKey];
      const second = b[sortKey];

      const comparison = String(first).localeCompare(
        String(second),
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        }
      );

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });
  }, [
    members,
    search,
    statusFilter,
    sortKey,
    sortDirection,
  ]);

  return (
    <div className="space-y-4">
      {/* Search and filter */}
      <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 md:flex-row">
        <div className="flex-1">
          <label
            htmlFor="member-search"
            className="sr-only"
          >
            Search members
          </label>

          <input
            id="member-search"
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by name, email, batch or city..."
            className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2"
          />
        </div>

        <div>
          <label
            htmlFor="status-filter"
            className="sr-only"
          >
            Filter by status
          </label>

          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | "all"
                  | MemberStatus
              )
            }
            className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 md:w-44"
          >
            {statusOptions.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status === "all"
                  ? "All statuses"
                  : status.charAt(0).toUpperCase() +
                    status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count */}
      <div className="text-sm text-gray-500">
        Showing {filteredAndSortedMembers.length} of{" "}
        {members.length} members
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <SortableHeader
                  label="Name"
                  sortKey="name"
                  activeSortKey={sortKey}
                  direction={sortDirection}
                  onSort={handleSort}
                />

                <SortableHeader
                  label="Email"
                  sortKey="email"
                  activeSortKey={sortKey}
                  direction={sortDirection}
                  onSort={handleSort}
                />

                <SortableHeader
                  label="Batch"
                  sortKey="batch"
                  activeSortKey={sortKey}
                  direction={sortDirection}
                  onSort={handleSort}
                />

                <SortableHeader
                  label="City"
                  sortKey="city"
                  activeSortKey={sortKey}
                  direction={sortDirection}
                  onSort={handleSort}
                />

                <SortableHeader
                  label="Status"
                  sortKey="status"
                  activeSortKey={sortKey}
                  direction={sortDirection}
                  onSort={handleSort}
                />

                <SortableHeader
                  label="Joined"
                  sortKey="joined"
                  activeSortKey={sortKey}
                  direction={sortDirection}
                  onSort={handleSort}
                />

                <th className="px-4 py-3 font-medium text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredAndSortedMembers.map(
                (member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-4 py-4 font-medium">
                      {member.name}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                      {member.email}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                      {member.batch}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                      {member.city}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <StatusBadge status={member.status} />
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                      {formatDate(member.joined)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <Link
                        href={`/members/${member.id}`}
                        className="font-medium underline underline-offset-4"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                )
              )}

              {filteredAndSortedMembers.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type SortableHeaderProps = {
  label: string;
  sortKey: SortKey;
  activeSortKey: SortKey;
  direction: SortDirection;
  onSort: (key: SortKey) => void;
};

function SortableHeader({
  label,
  sortKey,
  activeSortKey,
  direction,
  onSort,
}: SortableHeaderProps) {
  const isActive = activeSortKey === sortKey;

  return (
    <th className="px-4 py-3">
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="inline-flex items-center gap-1 font-medium text-gray-500 hover:text-black"
      >
        {label}

        <span aria-hidden="true">
          {isActive
            ? direction === "asc"
              ? "↑"
              : "↓"
            : "↕"}
        </span>
      </button>
    </th>
  );
}

function StatusBadge({
  status,
}: {
  status: MemberStatus;
}) {
  const className =
    status === "active"
      ? "bg-green-100 text-green-700"
      : status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {status.charAt(0).toUpperCase() +
        status.slice(1)}
    </span>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}