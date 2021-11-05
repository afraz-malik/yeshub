import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

import PaginationTable from "../../components/Shared/PaginationTable";
import eventApi from "../../api/event";
import { Link } from "react-router-dom";
import { MAIN_WEBSITE } from "../../config/config";
import paginationIndexCounter from "../../helper/paginationIndexCounter";
import Toaster from "../../components/Toast";
import { toast } from "react-toastify";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    eventApi.fetch(currentPage).then((response) => {
      setTotalPages(response.data.totalPages);
      setEvents([...response.data.docs]);
    });
  }, [currentPage]);

  const markAsFeaturedEvent = (id) => {
    eventApi.markFeatured(id).then(() => {
      const e = events.map((event) => {
        if (event._id === id) {
          event.isFeatured = true;
        }
        return event;
      });

      setEvents([...e]);
    });
  };

  const onPageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };

  const deleteEvent = (id, index) => {
    eventApi
      .deleteEvent(id)
      .then((res) => {
        events.splice(index, 1);
        setEvents([...events]);
        toast(res.message, { type: "success" });
      })
      .catch((err) => toast(err.message, { type: "error" }));
  };

  return (
    <React.Fragment>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4">Events</CardTitle>
                <div>
                  <Link
                    className="btn btn-warning btn-sm mr-2"
                    to="/admin/featured-events"
                  >
                    Featured Events
                  </Link>
                  <Link
                    to="/admin/events/pending-approval"
                    className="btn btn-sm btn-primary"
                  >
                    Pending Approval
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <PaginationTable
                  currentPage={currentPage}
                  onPaginationClick={onPageChange}
                  totalPages={totalPages}
                  responsive
                >
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Hosted By</th>
                      <th>Location</th>
                      <th>Contact Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.length > 0 ? (
                      events.map((event, index) => (
                        <tr key={event._id}>
                          <td>{paginationIndexCounter(currentPage, index)}</td>
                          <td>{event.eventName}</td>
                          <td>{event.description}</td>
                          <td>{event.hostedBy}</td>
                          <td>
                            {event.venue},{event.city},{event.country}
                          </td>
                          <td>{event.contactRsvp}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteEvent(event._id, index)}
                            >
                              Delete
                            </button>
                            <a
                              href={`${MAIN_WEBSITE}event/details/${event._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-primary mr-2"
                            >
                              Visit Page
                            </a>
                            {!event.isFeatured ? (
                              <Button
                                onClick={() => markAsFeaturedEvent(event._id)}
                                size="sm"
                                color="success"
                                className="mr-2"
                              >
                                Mark as Featured
                              </Button>
                            ) : null}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={999}>
                          No Record Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </PaginationTable>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Events;
