import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import axios from "axios";

const AdminCompaniesTable = () => {
  const { companies = [], searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [searchText, setSearchText] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useGetAllCompanies();

  useEffect(() => {
    const filteredCompanyList = companies
      .filter((company) => {
        if (!searchText) return true;
        return company.name.toLowerCase().includes(searchText.toLowerCase());
      })
      .sort((a, b) => {
        if (a.status === "pending" || a.status === "rejected") return -1;
        if (b.status === "pending" || b.status === "rejected") return 1;
        return 0;
      });
    setFilteredCompanies(filteredCompanyList);
  }, [companies, searchText]);

  const handleStatusUpdate = async (id, status) => {
    try {
      setLoading(true); // Start the spinner
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `http://localhost:8000/api/v1/admin/${id}/update`,
        { status }
      );

      if (response.data.success) {
        setFilteredCompanies((prevCompanies) =>
          prevCompanies.map((company) =>
            company._id === id ? { ...company, status } : company
          )
        );
        setSelectedCompany(null);
      } else {
        console.error("Failed to update status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating company status:", error);
    } finally {
      setLoading(false); // Stop the spinner
    }
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const closePopover = () => {
    setSelectedCompany(null);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search company"
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Table>
        <TableCaption>A list of all recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold ">Logo</TableHead>
            <TableHead  className="font-bold " >Name</TableHead>
            <TableHead  className="font-bold " >Date</TableHead>
            <TableHead  className="font-bold " >Status</TableHead>
            <TableHead className="text-right font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Pending and Rejected Companies */}
          {filteredCompanies
            .filter(
              (company) =>
                company.status === "pending" || company.status === "rejected"
            )
            .map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo}
                      alt={`${company.name} logo`}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      company.status === "rejected"
                        ? "bg-red-400"
                        : company.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }   `} // Ensure text is visible
                  >
                    {company.status.toUpperCase() || "N/A"}{" "}
                    {/* Default to 'N/A' if status is undefined */}
                  </Badge>
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger onClick={() => handleCompanyClick(company)}>
                      <MoreHorizontal />
                    </PopoverTrigger>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}

          {/* Verified Companies */}
          <TableRow>
            <TableCell colSpan="5" className="font-bold text-lg pt-6">
              Verified Companies
            </TableCell>
          </TableRow>
          {filteredCompanies
            .filter((company) => company.status === "verified")
            .map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo||"https://res.cloudinary.com/dauhbur4h/image/upload/v1730897841/gfg1eufd7qmahu9babqa.png"}
                      alt={`${company.name} logo`}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      company.status === "rejected"
                        ? "bg-red-400"
                        : company.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }  `} // Ensure text is visible
                  >
                    {company.status.toUpperCase() || "N/A"}{" "}
                    {/* Default to 'N/A' if status is undefined */}
                  </Badge>
                </TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger onClick={() => handleCompanyClick(company)}>
                      <MoreHorizontal />
                    </PopoverTrigger>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Popover Content */}
      {selectedCompany && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 max-w-full text-center animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closePopover}
            >
              ×
            </button>
            <h3 className="font-bold text-2xl mb-4 text-gray-800">
              {selectedCompany.name}
            </h3>
            <p className="text-gray-600 mb-2">{selectedCompany.description}</p>
            <p className="text-gray-500 mb-4">
              <strong>Location:</strong> {selectedCompany.location}
            </p>
            <p className="text-gray-500 mb-6">
              <strong>Status:</strong> {selectedCompany.status}
            </p>
            <a
              href={selectedCompany.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 mb-6 block"
            >
              Visit Website
            </a>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() =>
                  handleStatusUpdate(selectedCompany._id, "verified")
                }
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white ${
                  loading
                    ? "bg-gray-500"
                    : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                } shadow-md transition-all duration-200`}
              >
                {loading ? (
                  <div className="spinner-border text-white  " role="status">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  "Verify"
                )}
              </button>
              <button
                onClick={() =>
                  handleStatusUpdate(selectedCompany._id, "rejected")
                }
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white ${
                  loading
                    ? "bg-gray-500"
                    : "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700"
                } shadow-md transition-all duration-200`}
              >
                {loading ? (
                  <div className="spinner-border text-white  " role="status">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  "Reject"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCompaniesTable;
